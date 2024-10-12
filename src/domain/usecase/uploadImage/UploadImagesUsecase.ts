// usecase/UploadImagesUsecase.ts
import { v2 as cloudinary } from 'cloudinary'
import { HttpError } from '../../../infrastructure/errors/HttpError'
import { Images } from '../../entities/Images'

cloudinary.config({
    cloud_name: 'dvti5laoc',
    api_key: '616852622584911',
    api_secret: '_WxqsLcsI_YSPWMN9Nh5s8NvlEA', // Click 'View API Keys' above to copy your API secret
})

export class UploadImagesUsecase {
    async execute(files: Express.Multer.File[]): Promise<Images[]> {
        if (!files || !files.length)
            throw new HttpError('No images uploaded', 400)

        // ใช้ Promise ในการอัปโหลดแต่ละไฟล์ไปยัง Cloudinary
        const uploadPromises = files.map((file) => {
            return new Promise<Images>((resolve, reject) => {
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
