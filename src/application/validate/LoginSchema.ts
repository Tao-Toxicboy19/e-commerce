import { z } from 'zod'

// สร้าง Zod schema สำหรับการ login
export const loginSchema = z.object({
    email: z.string().email(), // ตรวจสอบว่าข้อมูลที่ส่งมาต้องเป็น email ที่ถูกต้อง
    password: z.string().min(6), // ตรวจสอบว่ารหัสผ่านต้องมีความยาวอย่างน้อย 6 ตัวอักษร
})
