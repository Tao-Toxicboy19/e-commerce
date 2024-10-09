import { Schema, model, Document } from 'mongoose'

// Type definition for Address
type Address = {
    street: string
    city: string
    state: string
    postalCode: number
    country: string
}

// Interface for User Document
export interface IUser extends Document {
    name: string
    email: string
    password: string
    address: Address | null
    role: 'customer' | 'admin'
}

// Define Address Schema
const AddressSchema = new Schema<Address>({
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    postalCode: { type: Number, required: true },
    country: { type: String, required: true },
})

// Define User Schema
export const UserSchema = new Schema<IUser>(
    {
        name: { type: String, required: true },
        email: { type: String, required: true },
        password: { type: String, required: true },
        address: { type: AddressSchema, required: false }, // Allow null address
        role: { type: String, enum: ['customer', 'admin'], required: true },
    },
    { timestamps: true }
)

// Create the User model
export const UserModel = model<IUser>('User', UserSchema)
