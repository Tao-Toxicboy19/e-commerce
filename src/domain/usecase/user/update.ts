import { User } from '../../entities/User'
import { IUserRepository } from '../../interfaces/IUserRepository'

export class UpdateUsecase {
    constructor(private userRepository: IUserRepository) {}

    async execute(dto: User): Promise<void> {
        return this.userRepository.update(dto)
    }
}
