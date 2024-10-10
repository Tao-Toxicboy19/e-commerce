import { ProductQuery, Products } from '../entities/Products'

export interface IProductsRepository {
    products({ query, category, range }: ProductQuery): Promise<Products[]>
    saveProduct(dto: Products): Promise<void>
    updateProduct(id: string, dto: Products): Promise<void>
    deleteProduct(id: string): Promise<void>
}
