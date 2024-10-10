export type Role = 'customer' | 'admin' | 'shop'

export class User {
    public name: string
    public email: string
    public password: string
    public role: Role

    constructor({
        name,
        email,
        password,
        role,
    }: {
        name: string
        email: string
        password: string
        role: Role
    }) {
        this.name = name
        this.email = email
        this.password = password
        this.role = role
    }
}
