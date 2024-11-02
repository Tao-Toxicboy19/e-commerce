import { ZodError } from 'zod'
import { addressDto } from '../AddressDto'

describe('addressDto', () => {
    it('should pass validation when data is correct', () => {
        const validAddress = {
            street: '123 Main St',
            city: 'Bangkok',
            state: 'Bangkok',
            postal_code: 10110,
            country: 'Thailand',
        }

        expect(() => addressDto.parse(validAddress)).not.toThrow()
    })

    it('should fail when postal_code is less than 5 digits', () => {
        const invalidAddress = {
            street: '123 Main St',
            city: 'Bangkok',
            state: 'Bangkok',
            postal_code: 123,
            country: 'Thailand',
        }

        try {
            addressDto.parse(invalidAddress)
        } catch (e) {
            expect(e).toBeInstanceOf(ZodError)
            if (e instanceof ZodError) {
                expect(e.errors[0].message).toBe(
                    'Postal code must be at least 5 digits'
                )
            }
        }
    })

    it('should fail when a required field is missing', () => {
        const invalidAddress = {
            street: '123 Main St',
            state: 'Bangkok',
            postal_code: 10110,
            country: 'Thailand',
        }

        try {
            addressDto.parse(invalidAddress)
        } catch (e) {
            expect(e).toBeInstanceOf(ZodError)
        }
    })
})
