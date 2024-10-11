import { UserJwt } from '../../entities/User'
import { IUserRepository } from '../../interfaces/IUserRepository'

export class LoginUsecase {
    constructor(private userRepository: IUserRepository) {}

    async execute(email: string, password: string): Promise<UserJwt> {
       return this.userRepository.login(email, password)
    }
}
