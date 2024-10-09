import { User } from '../entities/User'
import { IUserRepository } from '../interfaces/IUserRepository'

export class Update {
    constructor(private userRepository: IUserRepository) {}

    async execute(dto: User): Promise<string> {
        return this.userRepository.update(dto)
    }
}
