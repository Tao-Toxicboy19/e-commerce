import { z } from 'zod'

export const queryDto = z.object({
    query: z.string().optional(),
    category: z
        .union([z.string(), z.array(z.string())]) // อนุญาตทั้ง string และ array ของ string
        .optional(),
    search: z.string().optional(),
    start: z
        .string()
        .optional()
        .transform((val) => (val ? Number(val) : 0)), // start ต้องเป็น string ที่สามารถแปลงเป็น number หรือค่าเริ่มต้น 0
    end: z
        .string()
        .optional()
        .transform((val) => (val ? Number(val) : Infinity)), // end ต้องเป็น string ที่สามารถแปลงเป็น number หรือค่าเริ่มต้น Infinity
    limit: z
        .string()
        .optional()
        .transform((val) => (val ? Number(val) : 0)),
    page: z
        .string()
        .optional()
        .transform((val) => (val ? Number(val) : 0)),
})
