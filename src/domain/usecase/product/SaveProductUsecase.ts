import { Types } from 'mongoose'
import { HttpError } from '../../../infrastructure/errors/HttpError'
import { IProductsRepository } from '../../interfaces/IProductsRepository'
import { UploadImagesUsecase } from '../uploadImage/UploadImagesUsecase'
import { ProductDto } from '../../../application/validate/products/ProductDto'
import { ProductsEntities } from '../../entities/ProductsEntities'

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
        dto: ProductDto
        files: Express.Multer.File[]
    }): Promise<void> {
        if (!files || !files.length)
            throw new HttpError('No images uploaded', 400)

        if (dto.price <= 0) {
            throw new HttpError('Price must be greater than 0.', 400)
        }
        if (dto.stock <= 0) {
            throw new HttpError('Stock must be greater than 0.', 400)
        }
        const uploadedImages = await this.uploadImagesUsecase.execute(files)

        const productInstance = new ProductsEntities({
            ...dto,
            images: uploadedImages,
            shopOwner: new Types.ObjectId(userId),
        })
        return this.productsRepository.saveProduct(productInstance)
    }
}
