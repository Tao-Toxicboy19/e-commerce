import { IUserRepository } from '../interfaces/IUserRepository'

export class Login {
    constructor(private userRepository: IUserRepository) {}

    async execute(
        email: string,
        password: string
    ): Promise<{ sub: string; email: string }> {
        return this.userRepository.login(email, password)
    }
}
