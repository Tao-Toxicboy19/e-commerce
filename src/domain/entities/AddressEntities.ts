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
        if (!street) throw new Error('Street is required')
        if (!city) throw new Error('City is required')
        if (!state) throw new Error('State is required')
        if (!country) throw new Error('Country is required')
        if (
            typeof postalCode !== 'number' ||
            postalCode.toString().length < 5
        ) {
            throw new Error(
                'Postal code must be a number with at least 5 digits'
            )
        }
        if (typeof street !== 'string')
            throw new TypeError('street must be a string')
        if (typeof city !== 'string')
            throw new TypeError('city must be a string')
        if (typeof state !== 'string')
            throw new TypeError('state must be a string')
        if (typeof country !== 'string')
            throw new TypeError('country must be a string')

        this.street = street
        this.city = city
        this.state = state
        this.postalCode = postalCode
        this.country = country
    }
}
