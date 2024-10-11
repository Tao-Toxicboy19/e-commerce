import { Effect } from 'effect'
import { Products } from '../../entities/Products'
import { IProductsRepository } from '../../interfaces/IProductsRepository'

export class UpdateProductUsecase {
    constructor(private productsRepository: IProductsRepository) {}

    execute(id: string, dto: Products): Effect.Effect<void, Error> {
        return this.productsRepository.updateProduct(id, dto)
    }
}
