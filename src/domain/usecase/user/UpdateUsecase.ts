import { UserEntities } from '../../entities/UserEntities'
import { IUserRepository } from '../../interfaces/IUserRepository'

export class UpdateUsecase {
    constructor(private userRepository: IUserRepository) {}

    async execute(dto: UserEntities): Promise<void> {
        return this.userRepository.update(dto)
    }
}
