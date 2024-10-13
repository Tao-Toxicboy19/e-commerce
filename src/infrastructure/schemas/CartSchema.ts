import { model, Schema, Types } from 'mongoose'
import { CartItemSchema, ICartItem } from './CartItemSchema'

export interface ICart extends Document {
    userId: Types.ObjectId
    items: ICartItem[]
    totalPrice: number
    totalQuantity: number
}

// Define Address Schema
export const CartSchema: Schema<ICart> = new Schema<ICart>({
    userId: { type: Schema.Types.ObjectId, required: true },
    items: { type: [CartItemSchema], required: false },
    totalPrice: { type: Number, required: true },
    totalQuantity: { type: Number, required: true },
})

export const CartModel = model<ICart>('Cart', CartSchema)
