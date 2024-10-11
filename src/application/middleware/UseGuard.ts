import { Request, Response, NextFunction } from 'express'
import { Session } from 'express-session'
import jwt from 'jsonwebtoken'
import { Effect } from 'effect'
import { JwtPayload } from '../../types/JwtPayload'

interface ExtSession extends Session {
    access_token?: string
}

export class UseGuard {
    // เปลี่ยน jwtAuthGuard เป็น Effect
    static jwtAuthGuard(
        req: Request & { session: ExtSession },
        res: Response,
        next: NextFunction
    ) {
        const accessTokenEffect = Effect.try(() => {
            const accessToken = req.session.access_token

            if (!accessToken) {
                throw new Error('Unauthorized')
            }

            return accessToken
        })

        const verifyTokenEffect = Effect.flatMap(
            accessTokenEffect,
            (accessToken) =>
                Effect.try(() => {
                    const payload = jwt.verify(
                        accessToken,
                        process.env.AT_SECRET as string
                    ) as JwtPayload
                    req.user = payload
                    return payload
                })
        )

        Effect.runPromise(verifyTokenEffect).then(
            () => next(),
            (err) => {
                if (err.message === 'Unauthorized') {
                    res.status(401).json({ message: 'Unauthorized' })
                } else {
                    res.status(403).json({
                        message: 'Forbidden: Invalid token',
                    })
                }
            }
        )
    }

    // เปลี่ยน shopRoleGuard เป็น Effect
    static shopRoleGuard(req: Request, res: Response, next: NextFunction) {
        const roleCheckEffect = Effect.try(() => {
            const user = req.user as JwtPayload
            if (user && user.role === 'shop') {
                return user
            }
            throw new Error('Forbidden: Requires shop role')
        })

        Effect.runPromise(roleCheckEffect).then(
            () => next(),
            (err) => res.status(403).json({ message: err.message })
        )
    }
}
