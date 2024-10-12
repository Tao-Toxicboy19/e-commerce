import { Response } from 'express'
import { ZodError } from 'zod'
import { HttpError } from '../../infrastructure/errors/HttpError'

// สร้าง ErrorHandler class สำหรับจัดการกับ error
export class ErrorHandler {
    public static handleError(err: any, res: Response): void {
        if (err instanceof ZodError) {
            // ถ้าเป็น ZodError ให้ส่ง status 400 และ error details
            res.status(400).send({
                message: err.errors,
                statusCode: 400,
            })
        } else if (err instanceof HttpError) {
            // ถ้าเป็น HttpError ให้ส่ง status ตามที่กำหนดใน error
            res.status(err.statusCode).send({
                message: err.message,
                statusCode: err.statusCode,
            })
        } else {
            // สำหรับข้อผิดพลาดทั่วไปที่ไม่ได้ระบุ
            res.status(500).send({
                message: 'Internal Server Error',
                statusCode: 500,
            })
        }
    }
}
