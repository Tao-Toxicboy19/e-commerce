import { z } from 'zod'

export const cartDto = z.object({
    id: z.string(),
    productId: z.string(),
})

export type CartDto = z.infer<typeof cartDto>