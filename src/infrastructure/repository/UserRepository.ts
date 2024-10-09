import { User } from '../../domain/entities/User'
import { IUserRepository } from '../../domain/interfaces/IUserRepository'
import bcrypt from 'bcrypt'
import { UserModel } from '../schemas/UserSchema'
import { ObjectId } from 'mongoose'
import { HttpError } from '../errors/HttpError'

export class UserRepository implements IUserRepository {
    async login(
        email: string,
        password: string
    ): Promise<{ sub: string; email: string }> {
        const user = await UserModel.findOne({ email })
            .select('password email _id')
            .exec() // จำกัด fields เพื่อเพิ่มความเร็ว

        if (user && (await bcrypt.compare(password, user.password))) {
            return {
                sub: (user._id as ObjectId).toString(),
                email: user.email,
            }
        }

        throw new HttpError('Unauthorized', 401)
    }

    async profile(sub: string): Promise<User> {
        const user = await UserModel.findById({ _id: sub }).exec() // `.exec()` เพื่อให้ query มีประสิทธิภาพ
        if (!user) throw new Error('User not found.')

        return user
    }

    async signup(dto: User): Promise<string> {
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

        return 'OK'
    }

    async update(dto: User): Promise<string> {
        const updateUser = await UserModel.findByIdAndUpdate(
            { email: dto.email },
            {
                name: dto.name,
                email: dto.email,
                role: dto.role,
            },
            { new: true, runValidators: true }
        ).exec()

        if (!updateUser) throw new Error('User not found or update failed.')

        return 'OK'
    }
}
