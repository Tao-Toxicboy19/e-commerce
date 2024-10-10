import { z } from 'zod'
import { LoginUsecase } from '../../domain/usecase/user/LoginUsecase'
import { ProfileUsecase } from '../../domain/usecase/user/ProfileUsecase'
import { SignupUsecase } from '../../domain/usecase/user/SignupUsecase'
import { UpdateUsecase } from '../../domain/usecase/user/UpdateUsecase'
import { Request, Response } from 'express'
import { User } from '../../domain/entities/User'
import { HttpError } from '../../infrastructure/errors/HttpError'
import jwt, { JwtPayload } from 'jsonwebtoken'
import { Session } from 'express-session'

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

    // สร้าง Zod schema สำหรับการ login
    private loginSchema = z.object({
        email: z.string().email(), // ตรวจสอบว่าข้อมูลที่ส่งมาต้องเป็น email ที่ถูกต้อง
        password: z.string().min(6), // ตรวจสอบว่ารหัสผ่านต้องมีความยาวอย่างน้อย 6 ตัวอักษร
    })

    private userSchema = z.object({
        name: z.string(),
        email: z.string().email(),
        password: z.string().min(6),
    })

    async loginHandler(req: Request & { session: ExtSession }, res: Response) {
        try {
            // Validate ข้อมูลที่รับจาก request body
            const { email, password } = this.loginSchema.parse(req.body)
            const payload = await this.loginUsecase.execute(email, password)
            // บันทึก email ลงใน session ที่เชื่อมต่อกับ Redis
            const { accessToken, refreshToken } = this.getTokens(
                payload.sub,
                payload.email
            )

            req.session.access_token = accessToken
            // เก็บ Refresh Token ใน cookie แยก (หมดอายุใน 5 วัน)
            res.cookie('refresh_token', refreshToken, {
                httpOnly: true,
                maxAge: 1000 * 60 * 60 * 24 * 5, // 5 วัน
                secure: false, // ใช้ true สำหรับ HTTPS
            })

            res.send('Login Successful')
        } catch (err) {
            if (err instanceof HttpError) {
                res.status(err.statusCode).send({
                    message: err.message,
                    statusCode: err.statusCode,
                })
            } else {
                res.status(500).send({
                    message: err,
                    statusCode: 500,
                })
            }
        }
    }

    async profileHandler(req: Request, res: Response) {
        try {
            const payload = req.user as JwtPayload
            if (!payload || !payload.sub) {
                res.send('kko')
            }
            const user = await this.profileUsecase.execute(payload.sub!)
            res.json(user).status(200)
        } catch (err) {
            if (err instanceof HttpError) {
                res.status(err.statusCode).send({
                    message: err.message,
                    statusCode: err.statusCode,
                })
            } else {
                res.status(500).send({
                    message: err,
                    statusCode: 500,
                })
            }
        }
    }

    async signupHandler(req: Request, res: Response) {
        try {
            const { name, email, password } = this.userSchema.parse(req.body)
            const user = new User({
                name,
                email,
                password,
                role: 'customer',
            })
            await this.signupUsecase.execute(user)

            res.send('signup ok')
        } catch (err) {
            if (err instanceof HttpError) {
                res.status(err.statusCode).send({
                    message: err.message,
                    statusCode: err.statusCode,
                })
            } else {
                res.status(500).send({
                    message: err,
                    statusCode: 500,
                })
            }
        }
    }

    getTokens(userId: string, username: string): Tokens {
        const jwtPayload = {
            sub: userId,
            username: username,
        }
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
