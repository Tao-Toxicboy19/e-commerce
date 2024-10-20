import { HttpError } from '../../../infrastructure/errors/HttpError'
import { ProductsEntities } from '../../entities/ProductsEntities'
import {
    FindProduct,
    IProductsRepository,
} from '../../interfaces/IProductsRepository'

export class ProductsUsecase {
    constructor(private productsRepository: IProductsRepository) {}

    async execute({
        query,
        category,
        range,
        page,
        limit,
    }: FindProduct): Promise<{ count: number; products: ProductsEntities[] }> {
        // ตรวจสอบว่า end ต้องมากกว่า 0 และ start ต้องไม่ติดลบ
        if (range && range.start < 0) {
            throw new HttpError(
                'start must be greater than or equal to 0.',
                400
            )
        }

        if (range && range.end <= 0) {
            throw new HttpError('end must be greater than 0.', 400)
        }
        return this.productsRepository.products({
            query,
            category,
            range,
            limit,
            page,
        })
    }
}
