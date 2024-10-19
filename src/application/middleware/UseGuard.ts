import { Request, Response, NextFunction } from 'express'
import { Session } from 'express-session'
import jwt from 'jsonwebtoken'
import { JwtPayload } from '../../types/JwtPayload'

interface ExtSession extends Session {
    access_token?: string
}
export class UseGuard {
    static jwtAuthGuard(
        req: Request & { session: ExtSession },
        res: Response,
        next: NextFunction
    ): void {
        // อ่าน Access Token จาก session แทน cookies
        const accessToken = req.session.access_token

        if (!accessToken) {
            res.status(401).json({ message: 'Unauthorized' })
        }

        try {
            // ตรวจสอบและ verify JWT
            const payload = jwt.verify(
                accessToken!,
                process.env.AT_SECRET as string
            )
            req.user = payload // เก็บ payload ลงใน req.user

            next() // ส่งต่อไปยัง middleware หรือ route ถัดไป
        } catch (error) {
            res.status(403).json({ message: 'Forbidden: Invalid token' })
        }
    }

    static shopRoleGuard(
        req: Request,
        res: Response,
        next: NextFunction
    ): void {
        if (req.user && (req.user as JwtPayload).role === 'shop') {
            next() // ถ้า role เป็น 'shop' ให้ผ่านไป middleware ต่อไปได้
            return // เพิ่ม return เพื่อหยุดการทำงานหลังจาก next()
        }

        res.status(403).json({ message: 'Forbidden: Requires shop role' })
        return // เพิ่ม return เพื่อหยุดการทำงานหลังจากส่ง response
    }
}
