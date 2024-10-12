import { z } from 'zod'
import { addressDto } from './AddressDto'

export const saveShopDto = z.object({
    owner: z.string(),
    name: z.string(),
    address: addressDto,
})

export type SaveShopDto = z.infer<typeof saveShopDto>
