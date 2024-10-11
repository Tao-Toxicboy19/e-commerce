import { LoginUsecase } from '../../domain/usecase/user/LoginUsecase'
import { ProfileUsecase } from '../../domain/usecase/user/ProfileUsecase'
import { SignupUsecase } from '../../domain/usecase/user/SignupUsecase'
import { UpdateUsecase } from '../../domain/usecase/user/UpdateUsecase'
import { Request, Response } from 'express'
import { User } from '../../domain/entities/User'
import { HttpError } from '../../infrastructure/errors/HttpError'
import jwt from 'jsonwebtoken'
import { Session } from 'express-session'
import { loginSchema } from '../validate/LoginSchema'
import { userSchema } from '../validate/UserSchema'
import { JwtPayload } from '../../types/JwtPayload'
import { Effect } from 'effect'
import { ErrorHandler } from '../error/ErrorHandler'

type Payload = {
    userId: string
    email: string
    role: string
}

type Tokens = {
    accessToken: string
    refreshToken: string
}

interface ExtSession extends Session {
    access_token?: string
}

export class UserController {
    constructor(
        private loginUsecase: LoginUsecase,
        private signupUsecase: SignupUsecase,
        private profileUsecase: ProfileUsecase,
        private updateUsecase: UpdateUsecase
    ) {}

    async loginHandler(req: Request & { session: ExtSession }, res: Response) {
        // Effect สำหรับ validate ข้อมูลจาก request body
        const validateEffect = Effect.try(() => loginSchema.parse(req.body))

        // Effect สำหรับ login และดึง payload
        const loginEffect = Effect.flatMap(
            validateEffect,
            ({ email, password }) => this.loginUsecase.execute(email, password)
        )

        const saveSessionEffect = Effect.flatMap(loginEffect, (payload) => {
            const { accessToken, refreshToken } = this.getTokens({
                ...payload,
                userId: payload.sub,
            })

            // บันทึก Access Token ลงใน session
            req.session.access_token = accessToken

            // เก็บ Refresh Token ใน cookie
            res.cookie('refresh_token', refreshToken, {
                httpOnly: true,
                maxAge: 1000 * 60 * 60 * 24 * 5, // 5 วัน
                secure: false, // ใช้ true สำหรับ HTTPS
            })

            return Effect.succeed({ message: 'Login Successful' })
        })

        // Run Effect และจัดการข้อผิดพลาด
        Effect.runPromise(saveSessionEffect).then(
            (msg) => res.json(msg),
            (err) => ErrorHandler.handleError(err, res)
        )
    }

    profileHandler(req: Request, res: Response) {
        // Effect สำหรับตรวจสอบ JWT payload
        const validateEffect = Effect.try(() => {
            const payload = req.user as JwtPayload
            if (!payload || !payload.sub) res.status(401).send('Unauthorized')
            return payload.sub as string
        })

        // Effect สำหรับเรียกใช้ usecase เพื่อดึงข้อมูล profile
        const profileEffect = Effect.flatMap(validateEffect, (userId) =>
            this.profileUsecase.execute(userId)
        )

        // รัน Effect และจัดการผลลัพธ์หรือข้อผิดพลาด
        Effect.runPromise(profileEffect).then(
            (user) => res.status(200).json(user),
            (err) => ErrorHandler.handleError(err, res)
        )
    }

    async signupHandler(req: Request, res: Response) {
        const validateEffect = Effect.try(() => userSchema.parse(req.body))
        const userInstanceEffect = Effect.map(
            validateEffect,
            ({ name, email, password }) =>
                new User({ name, email, password, role: 'customer' })
        )
        const signupEffect = Effect.flatMap(userInstanceEffect, (user) =>
            this.signupUsecase.execute(user)
        )

        Effect.runPromise(signupEffect).then(
            () => res.status(200).json({ message: 'signup ok' }),
            (err) => ErrorHandler.handleError(err, res)
        )
    }

    private getTokens(jwtPayload: Payload): Tokens {
        if (!process.env.AT_SECRET || !process.env.RT_SECRET) {
            throw new HttpError(
                'Missing JWT secrets in environment variables',
                400
            )
        }

        const at = jwt.sign(jwtPayload, process.env.AT_SECRET, {
            expiresIn: '1d',
        })
        const rt = jwt.sign(jwtPayload, process.env.RT_SECRET, {
            expiresIn: '5d',
        })

        return {
            accessToken: at,
            refreshToken: rt,
        }
    }
}
