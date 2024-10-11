import { z } from 'zod'

export const addressSchema = z.object({
    street: z.string(),
    city: z.string(),
    state: z.string(),
    postal_code: z.number().min(4),
    country: z.string(),
})