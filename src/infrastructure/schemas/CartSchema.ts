import { Schema, Types } from 'mongoose'
import { CartItem } from '../../domain/entities/CartItem'
import { CartItemSchema } from './CartItemSchema'

export interface ICart extends Document {
    userId: Types.ObjectId
    items: CartItem[]
    totalPrice: number
    totalQuantity: number
}

// Define Address Schema
export const CartSchema: Schema<ICart> = new Schema<ICart>({
    userId: { type: Schema.Types.ObjectId, required: true },
    images: { type: CartItemSchema, required: false },
    totalPrice: { type: Number, required: true },
    totalQuantity: { type: Number, required: true },
})
