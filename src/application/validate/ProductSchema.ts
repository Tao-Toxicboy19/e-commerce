import { z } from 'zod'

export const productSchema = z.object({
    name: z.string(),
    description: z.string(),
    price: z
        .string()
        .transform((val) => parseFloat(val)) // แปลงจาก string เป็น number
        .refine((val) => !isNaN(val), { message: 'Invalid number' }), // ตรวจสอบว่าเป็น number จริง
    category: z.string(),
    brand: z.string(),
    stock: z
        .string()
        .transform((val) => parseInt(val, 10)) // แปลงจาก string เป็น number
        .refine((val) => !isNaN(val), { message: 'Invalid number' }), // ตรวจสอบว่าเป็น number จริง
})

export type ProductType = z.infer<typeof productSchema>
