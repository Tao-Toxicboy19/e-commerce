import { model, Schema, Types } from 'mongoose'

export interface ICartItem extends Document {
    productId: Types.ObjectId
    quantity: number
    subtotal: number
}

// Define Address Schema
export const CartItemSchema: Schema<ICartItem> = new Schema<ICartItem>({
    productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
    quantity: { type: Number, required: true },
    subtotal: {
        type: Number,
        required: true,
        set: (val: number) => Math.round(val * 100) / 100, // เก็บทศนิยมแค่ 2 ตำแหน่ง
    },
})

export const CartItemModel = model<ICartItem>('CartItem', CartItemSchema)