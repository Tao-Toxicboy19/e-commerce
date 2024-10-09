import { JwtPayload } from 'jsonwebtoken'

declare global {
    namespace Express {
        interface Request {
            user?: string | JwtPayload// เพิ่ม property user
        }
    }
}
