import { z } from 'zod'

export const queryDto = z.object({
    query: z.string().optional(),
    category: z
        .union([z.string(), z.array(z.string())]) 
        .optional(),
    search: z.string().optional(),
    start: z
        .string()
        .optional()
        .transform((val) => (val ? Number(val) : 0)),
    end: z
        .string()
        .optional()
        .transform((val) => (val ? Number(val) : Infinity)),
    limit: z
        .string()
        .refine((val) => !isNaN(Number(val)), { message: "Limit must be a numeric string" })
        .optional()
        .transform((val) => (val ? Number(val) : 0)),
    page: z
        .string()
        .refine((val) => !isNaN(Number(val)), { message: "Page must be a numeric string" })
        .optional()
        .transform((val) => (val ? Number(val) : 0)),
});
