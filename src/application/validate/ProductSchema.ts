import { z } from 'zod'

export const productSchema = z.object({
    name: z.string(),
    description: z.string(),
    price: z
        .string()
        .nonempty({ message: 'Price is required' }) // เพิ่มการตรวจสอบไม่ให้เป็นค่าว่าง
        .transform((val) => parseFloat(val)) // แปลงจาก string เป็น number
        .refine((val) => !isNaN(val), { message: 'Invalid number' }), // ตรวจสอบว่าเป็น number จริง
    category: z.string(),
    brand: z.string(),
    stock: z
        .string()
        .nonempty({ message: 'Stock is required' }) // เพิ่มการตรวจสอบไม่ให้เป็นค่าว่าง
        .transform((val) => parseInt(val, 10)) // แปลงจาก string เป็น number
        .refine((val) => !isNaN(val), { message: 'Invalid number' }), // ตรวจสอบว่าเป็น number จริง
})

export type ProductType = z.infer<typeof productSchema>
