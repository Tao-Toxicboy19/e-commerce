import { Schema, Types } from "mongoose";

export type Review = {
    userId: Types.ObjectId
    rating: number
    comment: string
}

// Define Review Schema
export const ReviewSchema: Schema<Review> = new Schema({
    userId: { type: Schema.Types.ObjectId, required: true },
    rating: { type: Number, required: true }, // 'Number' instead of 'number'
    comment: { type: String, required: true },
})