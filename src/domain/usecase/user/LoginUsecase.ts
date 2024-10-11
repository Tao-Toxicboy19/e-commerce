import { Effect } from 'effect'
import { UserJwt } from '../../entities/User'
import { IUserRepository } from '../../interfaces/IUserRepository'

export class LoginUsecase {
    constructor(private userRepository: IUserRepository) {}

    execute(email: string, password: string): Effect.Effect<UserJwt, Error> {
        return this.userRepository.login(email, password)
    }
}
