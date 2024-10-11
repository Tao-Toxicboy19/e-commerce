import { z } from "zod";
import { addressSchema } from "./AddressSchema";

export const productSchema = z.object({
    name: z.string(),
    description: z.string(),
    price: z.number(),
    category: z.string(),
    brand: z.string(),
    stock: z.number(),
    images: z.string().array(),
    shop: z.object({
        name: z.string(),
        address: addressSchema, // อ้างอิง addressSchema
    }),
})
