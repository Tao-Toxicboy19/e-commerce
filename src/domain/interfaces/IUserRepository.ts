import { User, UserJwt } from '../entities/User'

export interface IUserRepository {
    signup(dto: User): Promise<void>
    login(email: string, password: string): Promise<UserJwt>
    profile(sub: string): Promise<User>
    update(dto: User): Promise<void>
}
