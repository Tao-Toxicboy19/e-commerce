import { Schema, model, Document, Types } from 'mongoose'
import { Review, ReviewSchema } from './ReviewSchema'
import { Shop } from '../../domain/entities/Shop'
import { ShopSchema } from './ShopSchema'

export interface IProduct extends Document {
    name: string
    description: string
    price: number
    category: string
    brand: string
    stock: number
    images: string[]
    reviews: Review[]
    shop: Shop
}

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
    shop: { type: ShopSchema },
})

// Create the Product model
export const ProductModel = model<IProduct>('Product', ProductSchema)
