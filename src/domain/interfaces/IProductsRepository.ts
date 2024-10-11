import { Effect } from 'effect'
import { ProductQuery, Products } from '../entities/Products'

export interface IProductsRepository {
    products({
        query,
        category,
        range,
    }: ProductQuery): Effect.Effect<Products[], Error>
    saveProduct(dto: Products): Effect.Effect<void, Error>
    updateProduct(id: string, dto: Products): Effect.Effect<void, Error>
    deleteProduct(id: string): Effect.Effect<void, Error>
}
