import { z } from 'zod'
import { addressSchema } from './AddressSchema'

export const saveShopSchema = z.object({
    owner: z.string(),
    name: z.string(),
    address: addressSchema,
})
