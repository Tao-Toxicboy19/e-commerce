import { JwtPayload } from '../../../types/JwtPayload'
import { IUserRepository } from '../../interfaces/IUserRepository'

export class LoginUsecase {
    constructor(private userRepository: IUserRepository) {}

    async execute(email: string, password: string): Promise<JwtPayload> {
        return this.userRepository.login(email, password)
    }
}
