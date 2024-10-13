import { UserDto } from '../../../application/validate/UserDto'
import { UserEntities } from '../../entities/UserEntities'
import { IUserRepository } from '../../interfaces/IUserRepository'

export class SignupUsecase {
    constructor(private userRepository: IUserRepository) {}

    async execute(dto: UserDto): Promise<void> {
        const user = new UserEntities({
            ...dto,
            role: 'customer',
        })
        return this.userRepository.signup(user)
    }
}
