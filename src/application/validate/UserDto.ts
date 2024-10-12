import { z } from 'zod'

export const userDto = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
})

export type UserDto = z.infer<typeof userDto>
