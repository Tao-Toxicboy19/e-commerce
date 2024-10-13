import { model, Schema, Types, Document } from 'mongoose'

export interface ICategories extends Document {
    name: string
    cout: Types.ObjectId[] // เก็บ productId เป็น array ของ ObjectId
}

export const CategoriesSchema: Schema<ICategories> = new Schema<ICategories>({
    name: { type: String, required: true },
    cout: [{ type: Types.ObjectId, ref: 'Product', required: true }], // กำหนดเป็น array ที่อ้างอิง productId
})

export const CategoriesModel = model<ICategories>(
    'Categories',
    CategoriesSchema
)
