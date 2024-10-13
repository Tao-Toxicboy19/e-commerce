import { Schema, model, Document } from 'mongoose'
import { Role } from '../../domain/entities/UserEntities'
import { AddressSchema, IAddress } from './AddressSchema'
import { IShop, ShopSchema } from './ShopSchema'

// Interface for User Document
export interface IUser extends Document {
    name: string
    email: string
    password: string
    address: IAddress | null
    role: Role
    shop?: IShop
}

// Define User Schema
export const UserSchema: Schema<IUser> = new Schema<IUser>(
    {
        name: { type: String, required: true },
        email: { type: String, required: true },
        password: { type: String, required: true },
        address: { type: AddressSchema, required: false }, // Allow null address
        role: {
            type: String,
            enum: ['customer', 'admin', 'shop'],
            required: true,
        },
        shop: { type: ShopSchema, required: false },
    },
    { timestamps: true }
)

// Create the User model
export const UserModel = model<IUser>('User', UserSchema)
