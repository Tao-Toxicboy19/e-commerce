import { Schema, Types } from 'mongoose'

export interface ICartItem extends Document {
    productId: Types.ObjectId
    name: string
    quantity: number
    subtotal: number
}

// Define Address Schema
export const CartItemSchema: Schema<ICartItem> = new Schema<ICartItem>({
    productId: { type: Schema.Types.ObjectId, required: true },
    name: { type: String, required: true },
    quantity: { type: Number, required: true },
    subtotal: { type: Number, required: true },
})
