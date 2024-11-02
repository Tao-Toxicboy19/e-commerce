import { AddressEntities } from '../AddressEntities'

describe('AddressEntities', () => {
    it('should throw an error when street is missing', () => {
        expect(
            () =>
                new AddressEntities({
                    street: '',
                    city: 'Bangkok',
                    state: 'Bangkok',
                    postalCode: 10110,
                    country: 'Thailand',
                })
        ).toThrow('Street is required')
    })

    it('should throw an error when city is missing', () => {
        expect(
            () =>
                new AddressEntities({
                    street: '123 Main St',
                    city: '',
                    state: 'Bangkok',
                    postalCode: 10110,
                    country: 'Thailand',
                })
        ).toThrow('City is required')
    })

    it('should throw an error when state is missing', () => {
        expect(
            () =>
                new AddressEntities({
                    street: '123 Main St',
                    city: 'Bangkok',
                    state: '',
                    postalCode: 10110,
                    country: 'Thailand',
                })
        ).toThrow('State is required')
    })

    it('should throw an error when postalCode is missing', () => {
        expect(
            () =>
                new AddressEntities({
                    street: '123 Main St',
                    city: 'Bangkok',
                    state: 'Bangkok',
                    postalCode: null as any, // Invalid postalCode
                    country: 'Thailand',
                })
        ).toThrow('Postal code must be a number with at least 5 digits')
    })

    it('should throw an error when country is missing', () => {
        expect(
            () =>
                new AddressEntities({
                    street: '123 Main St',
                    city: 'Bangkok',
                    state: 'Bangkok',
                    postalCode: 10110,
                    country: '',
                })
        ).toThrow('Country is required')
    })

    it('should throw an error if street is not a string', () => {
        expect(
            () =>
                new AddressEntities({
                    street: 123 as any,
                    city: 'Bangkok',
                    state: 'Bangkok',
                    postalCode: 10110,
                    country: 'Thailand',
                })
        ).toThrow('street must be a string')
    })

    it('should throw an error if city is not a string', () => {
        expect(
            () =>
                new AddressEntities({
                    street: '123 Main St',
                    city: 123 as any,
                    state: 'Bangkok',
                    postalCode: 10110,
                    country: 'Thailand',
                })
        ).toThrow('city must be a string')
    })

    it('should throw an error if state is not a string', () => {
        expect(
            () =>
                new AddressEntities({
                    street: '123 Main St',
                    city: 'Bangkok',
                    state: 123 as any,
                    postalCode: 10110,
                    country: 'Thailand',
                })
        ).toThrow('state must be a string')
    })

    it('should throw an error if country is not a string', () => {
        expect(
            () =>
                new AddressEntities({
                    street: '123 Main St',
                    city: 'Bangkok',
                    state: 'Bangkok',
                    postalCode: 10110,
                    country: 123 as any,
                })
        ).toThrow('country must be a string')
    })

    it('should throw an error when postalCode has less than 5 digits', () => {
        expect(
            () =>
                new AddressEntities({
                    street: '123 Main St',
                    city: 'Bangkok',
                    state: 'Bangkok',
                    postalCode: 1234, // Invalid postalCode length
                    country: 'Thailand',
                })
        ).toThrow('Postal code must be a number with at least 5 digits')
    })

    it('should throw an error when postalCode is not a number', () => {
        expect(
            () =>
                new AddressEntities({
                    street: '123 Main St',
                    city: 'Bangkok',
                    state: 'Bangkok',
                    postalCode: 'ABCDE' as any, // Invalid postalCode type
                    country: 'Thailand',
                })
        ).toThrow('Postal code must be a number with at least 5 digits')
    })

    it('should throw an error when street is undefined', () => {
        expect(
            () =>
                new AddressEntities({
                    street: undefined as any, // Undefined street
                    city: 'Bangkok',
                    state: 'Bangkok',
                    postalCode: 10110,
                    country: 'Thailand',
                })
        ).toThrow('Street is required')
    })

    it('should throw an error when city is undefined', () => {
        expect(
            () =>
                new AddressEntities({
                    street: '123 Main St',
                    city: undefined as any, // Undefined city
                    state: 'Bangkok',
                    postalCode: 10110,
                    country: 'Thailand',
                })
        ).toThrow('City is required')
    })

    it('should throw an error when state is undefined', () => {
        expect(
            () =>
                new AddressEntities({
                    street: '123 Main St',
                    city: 'Bangkok',
                    state: undefined as any, // Undefined state
                    postalCode: 10110,
                    country: 'Thailand',
                })
        ).toThrow('State is required')
    })

    it('should throw an error when country is undefined', () => {
        expect(
            () =>
                new AddressEntities({
                    street: '123 Main St',
                    city: 'Bangkok',
                    state: 'Bangkok',
                    postalCode: 10110,
                    country: undefined as any, // Undefined country
                })
        ).toThrow('Country is required')
    })

    it('should create an instance with valid properties', () => {
        const address = new AddressEntities({
            street: '123 Main St',
            city: 'Bangkok',
            state: 'Bangkok',
            postalCode: 10110,
            country: 'Thailand',
        })

        expect(address.street).toBe('123 Main St')
        expect(address.city).toBe('Bangkok')
        expect(address.state).toBe('Bangkok')
        expect(address.postalCode).toBe(10110)
        expect(address.country).toBe('Thailand')
    })
})
