import { Effect } from 'effect'
import { IProductsRepository } from '../../interfaces/IProductsRepository'

export class DeleteProductUsecase {
    constructor(private productsRepository: IProductsRepository) {}

    execute(id: string): Effect.Effect<void, Error> {
        return this.productsRepository.deleteProduct(id)
    }
}
