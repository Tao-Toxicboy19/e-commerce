import { UserEntities } from '../../entities/UserEntities'
import { IUserRepository } from '../../interfaces/IUserRepository'

export class ProfileUsecase {
    constructor(private userRepository: IUserRepository) {}

    async execute(sub: string): Promise<UserEntities> {
        return this.userRepository.profile(sub)
    }
}
