import { Effect } from 'effect'
import { User, UserJwt } from '../entities/User'

export interface IUserRepository {
    signup(dto: User): Effect.Effect<void, Error>
    login(email: string, password: string): Effect.Effect<UserJwt, Error>
    profile(sub: string): Effect.Effect<User, Error>
    update(dto: User): Effect.Effect<void, Error>
}
