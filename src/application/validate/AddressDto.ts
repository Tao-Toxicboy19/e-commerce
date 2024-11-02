import { z } from 'zod'

export const addressDto = z.object({
    street: z.string(),
    city: z.string(),
    state: z.string(),
    postal_code: z.number().refine((val) => val.toString().length >= 5, {
        message: "Postal code must be at least 5 digits",
    }),
    country: z.string(),
});


export type AddressDto = z.infer<typeof addressDto>