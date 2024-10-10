import { HttpError } from '../../../infrastructure/errors/HttpError'
import { Products } from '../../entities/Products'
import { IProductsRepository } from '../../interfaces/IProductsRepository'

export class SaveProductUsecase {
    constructor(private productsRepository: IProductsRepository) {}

    async execute(dto: Products): Promise<void> {
        if (dto.price <= 0) {
            throw new HttpError('Price must be greater than 0.', 400)
        }
        if (dto.stock <= 0) {
            throw new HttpError('Stock must be greater than 0.', 400)
        }
        return this.productsRepository.saveProduct(dto)
    }
}