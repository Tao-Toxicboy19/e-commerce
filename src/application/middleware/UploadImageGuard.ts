import multer from 'multer'
import { Request } from 'express'
import { HttpError } from '../../infrastructure/errors/HttpError'

// สร้าง class สำหรับจัดการการอัปโหลดไฟล์
export class UploadImageGuard {
    private fileFilter(req: Request, file: Express.Multer.File, cb: Function) {
        if (
            file.mimetype === 'image/png' ||
            file.mimetype === 'image/jpg' ||
            file.mimetype === 'image/jpeg' ||
            file.mimetype === 'image/webp'
        ) {
            cb(null, true) // ยอมรับไฟล์นี้
        } else {
            cb(new HttpError('Only images are allowed', 400), false) // ปฏิเสธไฟล์อื่น
        }
    }

    // ตั้งค่า Multer
    public getUploader() {
        return multer({
            storage: multer.memoryStorage(),
            fileFilter: this.fileFilter,
        })
    }
}
