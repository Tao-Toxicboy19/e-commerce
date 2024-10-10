import { Products } from '../../entities/Products'
import { IProductsRepository } from '../../interfaces/IProductsRepository'

export class UpdateProductUsecase {
    constructor(private productsRepository: IProductsRepository) {}

    async execute(id: string, dto: Products): Promise<void> {
        return this.productsRepository.updateProduct(id, dto)
    }
}
