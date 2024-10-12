import { Types } from 'mongoose'
import { ProductType } from '../../../application/validate/ProductSchema'
import { HttpError } from '../../../infrastructure/errors/HttpError'
import { Products } from '../../entities/Products'
import { IProductsRepository } from '../../interfaces/IProductsRepository'
import { UploadImagesUsecase } from '../uploadImage/UploadImagesUsecase'

export class SaveProductUsecase {
    constructor(
        private productsRepository: IProductsRepository,
        private uploadImagesUsecase: UploadImagesUsecase
    ) {}

    async execute({
        userId,
        dto,
        files,
    }: {
        userId: string
        dto: ProductType
        files: Express.Multer.File[]
    }): Promise<void> {
        if (dto.price <= 0) {
            throw new HttpError('Price must be greater than 0.', 400)
        }
        if (dto.stock <= 0) {
            throw new HttpError('Stock must be greater than 0.', 400)
        }

        const uploadedImages = await this.uploadImagesUsecase.execute(files)

        const productInstance = new Products({
            ...dto,
            images: uploadedImages,
            shopOwner: new Types.ObjectId(userId),
        })

        return this.productsRepository.saveProduct(productInstance)
    }
}
