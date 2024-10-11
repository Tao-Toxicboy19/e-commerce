import { Effect } from 'effect'
import { User } from '../../entities/User'
import { IUserRepository } from '../../interfaces/IUserRepository'

export class ProfileUsecase {
    constructor(private userRepository: IUserRepository) {}

    execute(sub: string): Effect.Effect<User, Error> {
        return this.userRepository.profile(sub)
    }
}
