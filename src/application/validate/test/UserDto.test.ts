import { userDto, UserDto } from '../UserDto'

describe('user dto validation', () => {
    it('should password validation with validate data', () => {
        const valiData: UserDto = {
            name: 'John doe',
            email: 'john.doe@example.com',
            password: 'password123',
        }
        expect(() => userDto.parse(valiData)).not.toThrow()
    })

    it('should fail validation when name is missing', () => {
        const valiData = {
            email: 'john.doe@example.com',
            password: 'password123',
        }
        expect(() => userDto.parse(valiData)).toThrow()
    })

    it('should fail validation when email is invalid', () => {
        const valiData: UserDto = {
            name: 'John doe',
            email: 'john.doe',
            password: 'password123',
        }
        expect(() => userDto.parse(valiData)).toThrow()
    })

    it('should fail validation when password is too short', () => {
        const invalidData = {
            name: 'John Doe',
            email: 'john.doe@example.com',
            password: '123',
        }

        expect(() => userDto.parse(invalidData)).toThrow()
    })

    it('should fail validation when password is too number', () => {
        const invalidData = {
          name: 'John Doe',
          email: 'john.doe@example.com',
          password: 123123123
        }
    
        expect(() => userDto.parse(invalidData)).toThrow()
      })
})
