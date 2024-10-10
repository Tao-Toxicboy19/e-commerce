import { Schema, model, Document, Types } from 'mongoose'

type Review = {
    userId: Types.ObjectId
    rating: number
    comment: string
}

export interface IProduct extends Document {
    name: string
    description: string
    price: number
    category: string
    brand: string
    stock: number
    images: string[]
    reviews: Review[]
    shopId: Types.ObjectId
}

// Define Review Schema
const ReviewSchema: Schema<Review> = new Schema({
    userId: { type: Schema.Types.ObjectId, required: true },
    rating: { type: Number, required: true }, // 'Number' instead of 'number'
    comment: { type: String, required: true },
})

// Define Product Schema
export const ProductSchema: Schema<IProduct> = new Schema({
    name: { type: String, required: true, index: true }, // เพิ่ม index ที่ name
    description: { type: String, required: true },
    price: { type: Number, required: true, index: true }, // เพิ่ม index ที่ price
    category: { type: String, required: true, index: true }, // เพิ่ม index ที่ category
    brand: { type: String, required: true },
    stock: { type: Number, required: true },
    images: { type: [String], required: true },
    reviews: [ReviewSchema],
    shopId: { type: Schema.Types.ObjectId, required: true, index: true, },
})

// Create the User model
export const ProductModel = model<IProduct>('Product', ProductSchema)
