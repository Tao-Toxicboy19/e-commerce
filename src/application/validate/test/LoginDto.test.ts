import { loginDto } from '../LoginDto'

describe('login dto', () => {
    it('should pass validation when data is corrent', () => {
        const validateLogin = {
            email: 'test@test.com',
            password: 'test@test123',
        }

        expect(() => loginDto.parse(validateLogin)).not.toThrow()
    })

    it('should fail whene email format is incorrect', () => {
        const invalidEmail = {
            email: 'testtest.com',
            password: 'testtesttest@',
        }

        expect(() => loginDto.parse(invalidEmail)).toThrow()
    })

    it('should fail whene password is less then 6 digits', () => {
        const invalidPassword = {
            email: 'test@test.com',
            password: '12345',
        }

        expect(() => loginDto.parse(invalidPassword)).toThrow()
    })
})
