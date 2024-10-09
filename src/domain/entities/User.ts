export class User {
    public name: string
    public email: string
    public password: string
    public role: 'customer' | 'admin'

    constructor({
        name,
        email,
        password,
        role,
    }: {
        name: string
        email: string
        password: string
        role: 'customer' | 'admin'
    }) {
        this.name = name
        this.email = email
        this.password = password
        this.role = role
    }
}
