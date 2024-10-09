import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

export function JwtAuthGuard(
    req: Request,
    res: Response,
    next: NextFunction
): void {
    const accessToken = req.cookies.access_token

    if (!accessToken) res.status(401).json({ message: 'Unauthorized' })

    try {
        // ตรวจสอบและ verify JWT
        const payload = jwt.verify(
            accessToken,
            process.env.JWT_SECRET as string
        )
        req.user = payload // เก็บ payload ใน req.user

        next() // ส่งต่อไปยัง middleware หรือ route ถัดไป
    } catch (error) {
        res.status(403).json({ message: 'Forbidden: Invalid token' })
    }
}
