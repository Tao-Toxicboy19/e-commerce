import multer from 'multer'
import { Request } from 'express'
import { HttpError } from '../../infrastructure/errors/HttpError'

// สร้าง class สำหรับจัดการการอัปโหลดไฟล์
export class UploadImageGuard {
    // กำหนดประเภทของ callback ให้ถูกต้อง
    private fileFilter(
        req: Request,
        file: Express.Multer.File,
        cb: multer.FileFilterCallback
    ) {
        const allowedMimeTypes = [
            'image/png',
            'image/jpg',
            'image/jpeg',
            'image/webp',
        ]
        if (allowedMimeTypes.includes(file.mimetype)) {
            cb(null, true) // ยอมรับไฟล์นี้
        } else {
            cb(new HttpError('Only images are allowed', 400)) // ปฏิเสธไฟล์ที่ไม่ตรงประเภท
        }
    }

    // ตั้งค่า Multer
    public getUploader() {
        return multer({
            storage: multer.memoryStorage(), // เก็บไฟล์ใน memory ก่อน
            fileFilter: this.fileFilter.bind(this), // ต้อง bind เพื่อให้ใช้ context ของ class
        })
    }
}
