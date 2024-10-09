type Address = {
    street: string
    city: string
    state: string
    postalCode: number
    country: string
}

export class User {
    public name: string
    public email: string
    public password: string
    public address?: Address | null
    public role: 'customer' | 'admin'

    constructor({
        name,
        email,
        password,
        address,
        role,
    }: {
        name: string
        email: string
        password: string
        address: Address | null
        role: 'customer' | 'admin'
    }) {
        this.name = name
        this.email = email
        this.password = password
        this.address = address
        this.role = role
    }
}
