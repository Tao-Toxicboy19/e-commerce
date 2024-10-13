import { ProductQuery, ProductsEntities } from '../entities/ProductsEntities'

export interface IProductsRepository {
    products({
        query,
        category,
        range,
    }: ProductQuery): Promise<ProductsEntities[]>
    saveProduct(dto: ProductsEntities): Promise<void>
    updateProduct(dto: ProductsEntities): Promise<void>
    deleteProduct(id: string): Promise<void>
}
