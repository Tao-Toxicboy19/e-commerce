import { AddressDto } from '../AddressDto'
import { saveShopDto, SaveShopDto } from '../SaveShopDto'

describe('save shop dto', () => {
    it('should pass validation when data is corrent', () => {
        const address: AddressDto = {
            street: '123 Main St',
            city: 'Bangkok',
            state: 'Bangkok',
            postal_code: 10110,
            country: 'Thailand',
        }
        const validatePass: SaveShopDto = {
            name: 'test',
            owner: 'toxicboy',
            address,
        }

        expect(() => saveShopDto.parse(validatePass)).not.toThrow()
    })

    it('should fail when name is missing', () => {
        const address: AddressDto = {
            street: '123 Main St',
            city: 'Bangkok',
            state: 'Bangkok',
            postal_code: 10110,
            country: 'Thailand',
        }

        const invalid = {
            owner: 'toxicboy',
            address,
        }

        expect(() => saveShopDto.parse(invalid)).toThrow()
    })

    it('should fail when owner is missing', () => {
        const address: AddressDto = {
            street: '123 Main St',
            city: 'Bangkok',
            state: 'Bangkok',
            postal_code: 10110,
            country: 'Thailand',
        }

        const invalid = {
            name: 'toxicboy',
            address,
        }

        expect(() => saveShopDto.parse(invalid)).toThrow()
    })

    it('should fail when address is missing', () => {
        const invalid = {
            name: 'toxicboy',
            owner: 'toxicboy',
        }

        expect(() => saveShopDto.parse(invalid)).toThrow()
    })
})
