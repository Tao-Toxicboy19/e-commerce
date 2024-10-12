import { z } from 'zod'

// สร้าง Zod schema สำหรับการ login
export const deleteProductDto = z.object({
    id: z.string(),
})
