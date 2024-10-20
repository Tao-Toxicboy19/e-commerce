import { IProductsRepository } from '../../interfaces/IProductsRepository'

export class SearchProductUsecase {
    constructor(private productRepository: IProductsRepository) {}

    async execute(productName: string): Promise<string[]> {
        return this.productRepository.searchProduct(productName)
    }
}
