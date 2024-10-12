import { z } from "zod";

export const queryDto = z.object({
    query: z.string().optional(),
    category: z.string().optional(),
    start: z
        .string()
        .optional()
        .transform((val) => (val ? Number(val) : 0)), // start ต้องเป็น string ที่สามารถแปลงเป็น number หรือค่าเริ่มต้น 0
    end: z
        .string()
        .optional()
        .transform((val) => (val ? Number(val) : Infinity)), // end ต้องเป็น string ที่สามารถแปลงเป็น number หรือค่าเริ่มต้น Infinity
})
