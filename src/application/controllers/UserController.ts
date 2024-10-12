import { ZodError } from 'zod'
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
        try {
            // Validate ข้อมูลที่รับจาก request body
            const { email, password } = loginSchema.parse(req.body)
            const payload = await this.loginUsecase.execute(email, password)

            // บันทึก email ลงใน session ที่เชื่อมต่อกับ Redis
            const { accessToken, refreshToken } = this.getTokens({
                ...payload,
                userId: payload.sub,
            })

            req.session.access_token = accessToken
            // เก็บ Refresh Token ใน cookie แยก (หมดอายุใน 5 วัน)
            res.cookie('refresh_token', refreshToken, {
                httpOnly: true,
                maxAge: 1000 * 60 * 60 * 24 * 5, // 5 วัน
                secure: false, // ใช้ true สำหรับ HTTPS
            })

            res.send('Login Successful')
        } catch (err) {
            ErrorHandler.handleError(err, res)
        }
    }

    async profileHandler(req: Request, res: Response) {
        try {
            const payload = req.user as JwtPayload
            const user = await this.profileUsecase.execute(
                payload.sub as string
            )
            res.json(user).status(200)
        } catch (err) {
            ErrorHandler.handleError(err, res)
        }
    }

    async signupHandler(req: Request, res: Response) {
        try {
            const { name, email, password } = userSchema.parse(req.body)
            const user = new User({
                name,
                email,
                password,
                role: 'customer',
            })
            await this.signupUsecase.execute(user)

            res.send('signup ok')
        } catch (err) {
            ErrorHandler.handleError(err, res)
        }
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
