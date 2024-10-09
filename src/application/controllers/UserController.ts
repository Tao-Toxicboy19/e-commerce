import { z } from 'zod'
import { Login } from '../../domain/usecase/login'
import { Profile } from '../../domain/usecase/profile'
import { Signup } from '../../domain/usecase/signup'
import { Update } from '../../domain/usecase/update'
import { Request, Response } from 'express'
import { User } from '../../domain/entities/User'
import { HttpError } from '../../infrastructure/errors/HttpError'
import jwt from 'jsonwebtoken'

type Tokens = {
    accessToken: string
    refreshToken: string
}

export class UserController {
    constructor(
        private login: Login,
        private signup: Signup,
        private profile: Profile,
        private update: Update
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

    async loginHandler(req: Request, res: Response) {
        try {
            // Validate ข้อมูลที่รับจาก request body
            const { email, password } = this.loginSchema.parse(req.body)
            const payload = await this.login.execute(email, password)
            // บันทึก email ลงใน session ที่เชื่อมต่อกับ Redis
            const { accessToken, refreshToken } = this.getTokens(
                payload.sub,
                payload.email
            )

            req.session.access_token = accessToken
            req.session.refresh_token = refreshToken

            res.send('Login Successful')
        } catch (err) {
            console.log(err)
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
                address: null,
            })
            await this.signup.execute(user)

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

// res.cookie('access_token', accessToken, {
//     httpOnly: true,
//     maxAge: 1 * 24 * 60 * 60 * 1000, // 1d
//     sameSite: 'strict',
//     secure: process.env.NODE_ENV === 'production',
// })

// res.cookie('refresh_token', refreshToken, {
//     httpOnly: true,
//     maxAge: 5 * 24 * 60 * 60 * 1000, // 1d
//     sameSite: 'strict',
//     secure: process.env.NODE_ENV === 'production',
// })
