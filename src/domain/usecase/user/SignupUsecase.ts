import { UserType } from '../../../application/validate/UserSchema'
import { User } from '../../entities/User'
import { IUserRepository } from '../../interfaces/IUserRepository'

export class SignupUsecase {
    constructor(private userRepository: IUserRepository) {}

    async execute(dto: UserType): Promise<void> {
        const user = new User({
            ...dto,
            role: 'customer',
        })
        return this.userRepository.signup(user)
    }
}
