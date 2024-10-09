import { User } from '../entities/User'
import { IUserRepository } from '../interfaces/IUserRepository'

export class Profile {
    constructor(private userRepository: IUserRepository) {}

    async execute(sub: string): Promise<User> {
        return this.userRepository.profile(sub)
    }
}