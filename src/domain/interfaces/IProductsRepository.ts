import { ProductsEntities } from '../entities/ProductsEntities'

export interface FindProduct {
    query?: string
    category?: string
    range?: { start: number; end: number }
}

export interface IProductsRepository {
    products({
        query,
        category,
        range,
    }: FindProduct): Promise<ProductsEntities[]>
    saveProduct(dto: ProductsEntities): Promise<void>
    updateProduct(dto: ProductsEntities): Promise<void>
    deleteProduct(id: string): Promise<void>
}
