import { Schema, model, Document, Types } from 'mongoose'
import { IReview, ReviewSchema } from './ReviewSchema'
import { IImages, ImagesSchema } from './ImageSchema'

export interface IProduct extends Document {
    name: string
    description: string
    price: number
    category: string
    brand: string
    stock: number
    images: IImages[]
    reviews: IReview[]
    shopOwner: Types.ObjectId
}

// Define Product Schema
export const ProductSchema: Schema<IProduct> = new Schema({
    name: { type: String, required: true, index: true }, // เพิ่ม index ที่ name
    description: { type: String, required: true },
    price: { type: Number, required: true, index: true }, // เพิ่ม index ที่ price
    category: { type: String, required: true, index: true }, // เพิ่ม index ที่ category
    brand: { type: String, required: true },
    stock: { type: Number, required: true },
    images: { type: [ImagesSchema], required: true },
    reviews: [ReviewSchema],
    shopOwner: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        index: true,
        required: true,
    },
})

// Create the Product model
export const ProductModel = model<IProduct>('Product', ProductSchema)
