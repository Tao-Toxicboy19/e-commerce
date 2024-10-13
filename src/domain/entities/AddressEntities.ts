export class AddressEntities {
    public street: string
    public city: string
    public state: string
    public postalCode: number
    public country: string

    constructor({
        street,
        city,
        state,
        postalCode,
        country,
    }: {
        street: string
        city: string
        state: string
        postalCode: number
        country: string
    }) {
        this.street = street
        this.city = city
        this.state = state
        this.postalCode = postalCode
        this.country = country
    }
}
