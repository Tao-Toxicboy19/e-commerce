import { JwtPayload as Jwt } from 'jsonwebtoken'

export type JwtPayload = {
    sub: string
    email: string
    role: string
} & Jwt
