import { Types } from 'mongoose'
import { UpdateProductDto } from '../../../application/validate/products/UpdateProductDto'
import { IProductsRepository } from '../../interfaces/IProductsRepository'
import { UploadImagesUsecase } from '../uploadImage/UploadImagesUsecase'
import { ImagesEntities } from '../../entities/ImagesEntities'
import { ProductsEntities } from '../../entities/ProductsEntities'

export class UpdateProductUsecase {
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
        dto: UpdateProductDto
        files: Express.Multer.File[]
    }): Promise<void> {
        let uploadedImages: ImagesEntities[] = []

        if (files)
            uploadedImages = await this.uploadImagesUsecase.execute(files)

        const productInstance = new ProductsEntities({
            id: dto.id,
            name: dto.name,
            description: dto.description,
            price: dto.price,
            category: dto.category,
            brand: dto.brand,
            stock: dto.stock,
            images: uploadedImages,
            shopOwner: new Types.ObjectId(userId),
        })

        return this.productsRepository.updateProduct(productInstance)
    }
}
