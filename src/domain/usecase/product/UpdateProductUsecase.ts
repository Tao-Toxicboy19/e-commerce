import { Types } from 'mongoose'
import { UpdateProductDto } from '../../../application/validate/products/UpdateProductDto'
import { Images } from '../../entities/Images'
import { Products } from '../../entities/Products'
import { IProductsRepository } from '../../interfaces/IProductsRepository'
import { UploadImagesUsecase } from '../uploadImage/UploadImagesUsecase'

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
        let uploadedImages: Images[] = []

        if (files)
            uploadedImages = await this.uploadImagesUsecase.execute(files)

        const productInstance = new Products({
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
