// usecase/UploadImagesUsecase.ts
import { v2 as cloudinary } from 'cloudinary'
import { HttpError } from '../../../infrastructure/errors/HttpError'
import { ImagesEntities } from '../../entities/ImagesEntities'

cloudinary.config({
    cloud_name: 'dvti5laoc',
    api_key: '616852622584911',
    api_secret: '_WxqsLcsI_YSPWMN9Nh5s8NvlEA',
})

export class UploadImagesUsecase {
    async execute(files: Express.Multer.File[]): Promise<ImagesEntities[]> {
        // ใช้ Promise ในการอัปโหลดแต่ละไฟล์ไปยัง Cloudinary
        const uploadPromises = files.map((file) => {
            return new Promise<ImagesEntities>((resolve, reject) => {
                const uploadStream = cloudinary.uploader.upload_stream(
                    (error, result) => {
                        if (error) {
                            console.error('Cloudinary error:', error)
                            reject(
                                new HttpError(
                                    'Upload to Cloudinary failed',
                                    500
                                )
                            )
                        } else if (result) {
                            resolve({
                                asset_id: result.asset_id,
                                public_id: result.public_id,
                                url: result.url,
                                secure_url: result.secure_url,
                            }) // ส่งกลับ URL ของรูปภาพที่ถูกอัปโหลด
                        }
                    }
                )
                uploadStream.end(file.buffer) // อัปโหลดไฟล์จาก buffer
            })
        })

        return await Promise.all(uploadPromises)
    }
}
