import { Schema, Types } from 'mongoose'

export interface IReview extends Document {
    userId: Types.ObjectId
    rating: number
    comment: string
}

// Define Review Schema
export const ReviewSchema: Schema<IReview> = new Schema<IReview>({
    userId: { type: Schema.Types.ObjectId, required: true },
    rating: { type: Number, required: true }, // 'Number' instead of 'number'
    comment: { type: String, required: true },
})
