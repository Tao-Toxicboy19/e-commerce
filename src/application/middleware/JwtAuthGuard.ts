import { Request, Response, NextFunction } from 'express'
import { Session } from 'express-session'
import jwt from 'jsonwebtoken'

interface ExtSession extends Session {
    access_token?: string
}

export function JwtAuthGuard(
    req: Request & { session: ExtSession },
    res: Response,
    next: NextFunction
): void {
    // อ่าน Access Token จาก session แทน cookies
    const accessToken = req.session.access_token

    if (!accessToken) res.status(401).json({ message: 'Unauthorized' })

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
