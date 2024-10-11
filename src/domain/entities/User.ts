import { Shop } from './Shop'

export type Role = 'customer' | 'admin' | 'shop'

export type UserJwt = {
    sub: string
    email: string
    role: string
}

export class User {
    public name: string
    public email: string
    public password: string
    public role: Role
    public shop?: Shop
    constructor({
        name,
        email,
        password,
        role,
        shop,
    }: {
        name: string
        email: string
        password: string
        role: Role
        shop?: Shop
    }) {
        this.name = name
        this.email = email
        this.password = password
        this.role = role
        this.shop = shop
    }
}
