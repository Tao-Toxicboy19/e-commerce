import { ShopEntities } from './ShopEntities'

export type Role = 'customer' | 'admin' | 'shop'

export class UserEntities {
    public name: string
    public email: string
    public password: string
    public role: Role
    public shop?: ShopEntities
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
        shop?: ShopEntities
    }) {
        this.name = name
        this.email = email
        this.password = password
        this.role = role
        this.shop = shop
    }
}
