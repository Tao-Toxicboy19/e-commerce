import { Effect } from 'effect'
import { User } from '../../entities/User'
import { IUserRepository } from '../../interfaces/IUserRepository'

export class SignupUsecase {
    constructor(private userRepository: IUserRepository) {}

    execute(dto: User): Effect.Effect<void, Error> {
        return this.userRepository.signup(dto)
    }
}
