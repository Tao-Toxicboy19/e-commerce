import { IUserRepository } from '../../domain/interfaces/IUserRepository'
import bcrypt from 'bcrypt'
import { UserModel } from '../schemas/UserSchema'
import { ObjectId } from 'mongoose'
import { HttpError } from '../errors/HttpError'
import { JwtPayload } from '../../types/JwtPayload'
import { UserEntities } from '../../domain/entities/UserEntities'

export class UserRepository implements IUserRepository {
    async login(email: string, password: string): Promise<JwtPayload> {
        const user = await UserModel.findOne({ email })
            .select('password email _id role')
            .exec() // จำกัด fields เพื่อเพิ่มความเร็ว

        if (user && (await bcrypt.compare(password, user.password))) {
            return {
                sub: (user._id as ObjectId).toString(),
                email: user.email,
                role: user.role,
            }
        }

        throw new HttpError('Unauthorized', 401)
    }

    async profile(sub: string): Promise<UserEntities> {
        const user = await UserModel.findById({ _id: sub })
            .select('_id name email role address shop')
            .exec() // `.exec()` เพื่อให้ query มีประสิทธิภาพ
        if (!user) throw new HttpError('User not found.', 404)

        return user
    }

    async signup(dto: UserEntities): Promise<void> {
        const existingUser = await UserModel.findOne({
            $or: [{ name: dto.name }, { email: dto.email }],
        }).exec()

        if (existingUser)
            throw new HttpError('User or email already exists.', 407)

        const hash = await bcrypt.hash(dto.password, 10)
        const newUser = new UserModel({
            name: dto.name,
            email: dto.email,
            password: hash,
            role: dto.role,
        })
        await newUser.save()
    }

    async update(dto: UserEntities): Promise<void> {
        const updateUser = await UserModel.findByIdAndUpdate(
            { email: dto.email },
            {
                name: dto.name,
                email: dto.email,
                role: dto.role,
            },
            { new: true, runValidators: true }
        ).exec()

        if (!updateUser)
            throw new HttpError('User not found or update failed.', 404)
    }
}
