import { User } from '../entities/User'

export interface IUserRepository {
    signup(dto: User): Promise<void>
    login(
        email: string,
        password: string
    ): Promise<{ sub: string; email: string }>
    profile(sub: string): Promise<User>
    update(dto: User): Promise<void>
}
