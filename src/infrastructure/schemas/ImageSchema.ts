import { Schema } from 'mongoose'

export interface IImages extends Document {
    asset_id: string
    public_id: string
    url: string
    secure_url: string
}

// Define Address Schema
export const ImagesSchema: Schema<IImages> = new Schema<IImages>({
    asset_id: { type: String, required: true },
    public_id: { type: String, required: true },
    url: { type: String, required: true },
    secure_url: { type: String, required: true },
})
