import { Schema, model, Document, Types } from 'mongoose'
import { Address } from '../../domain/entities/Address'
import { AddressSchema } from './AddressSchema'

export interface IShop extends Document {
    owner: string
    name: string
    address: Address
}

// Define Shop Schema
export const ShopSchema: Schema<IShop> = new Schema<IShop>({
    owner: { type: String, required: true },
    name: { type: String, required: true, index: true }, // เพิ่ม index ที่ name
    address: { type: AddressSchema, required: true },
})

// export const ShopModel = model<IShop>('Shop', ShopSchema)
