import { model, Schema, Types } from 'mongoose'

interface IProducts {
    productId: Types.ObjectId
}

interface ICatogory {
    name: string
    products: IProducts[]
}

// สร้าง schema สำหรับ Categories
const categorySchema: Schema<ICatogory> = new Schema<ICatogory>(
    {
        name: {
            type: String,
            required: true, // ชื่อหมวดหมู่ต้องมีค่าเสมอ
            trim: true,
        },
        products: [
            {
                productId: {
                    type: Types.ObjectId, // อ้างอิงถึง ObjectId ของสินค้า
                    ref: 'Product', // เชื่อมต่อกับ collection ของสินค้า
                    required: true, // ต้องมีค่าเสมอ
                },
            },
        ],
    },
    {
        timestamps: true, // เพิ่ม createdAt และ updatedAt อัตโนมัติ
    }
)

// สร้าง model สำหรับ Categories
export const CategoryModel = model<ICatogory>('Category', categorySchema)
