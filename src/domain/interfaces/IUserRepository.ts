import { JwtPayload } from '../../types/JwtPayload'
import { UserEntities } from '../entities/UserEntities'

export interface IUserRepository {
    signup(dto: UserEntities): Promise<void>
    login(email: string, password: string): Promise<JwtPayload>
    profile(sub: string): Promise<UserEntities>
    update(dto: UserEntities): Promise<void>
}
