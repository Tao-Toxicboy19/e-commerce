import { ProductsEntities } from '../entities/ProductsEntities'

export interface FindProduct {
    query?: string
    category?: string
    range?: { start: number; end: number }
    page?: number
    limit?: number
}

export interface IProductsRepository {
    products({
        query,
        category,
        range,
        page,
        limit,
    }: FindProduct): Promise<{ count: number; products: ProductsEntities[] }>
    saveProduct(dto: ProductsEntities): Promise<void>
    updateProduct(dto: ProductsEntities): Promise<void>
    deleteProduct(id: string): Promise<void>
    searchProduct(productName: string): Promise<string[]>
}
