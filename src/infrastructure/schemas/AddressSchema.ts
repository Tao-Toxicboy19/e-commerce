import { Schema } from "mongoose"

// Type definition for Address
type Address = {
    street: string
    city: string
    state: string
    postalCode: number
    country: string
}

// Define Address Schema
export const AddressSchema: Schema<Address> = new Schema<Address>({
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    postalCode: { type: Number, required: true },
    country: { type: String, required: true },
})
