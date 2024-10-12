import { ProductQuery, Products } from '../../domain/entities/Products'
import { IProductsRepository } from '../../domain/interfaces/IProductsRepository'
import { HttpError } from '../errors/HttpError'
import { ProductModel } from '../schemas/ProductSchema'

interface SearchConditions {
    name?: { $regex: string; $options: string }
    category?: { $regex: string; $options: string }
    price?: { $gte: number; $lte: number }
}

export class ProductRepository implements IProductsRepository {
    async products({
        query,
        category,
        range,
    }: ProductQuery): Promise<Products[]> {
        try {
            let searchConditions: SearchConditions = {}
            if (query) searchConditions.name = { $regex: query, $options: 'i' }
            if (category)
                searchConditions.category = { $regex: category, $options: 'i' }
            if (range && range.start >= 0 && range.end > 0) {
                searchConditions.price = {
                    $gte: range.start,
                    $lte: range.end,
                }
            }

            return await ProductModel.find(searchConditions)
                .select('-reviews -__v')
                .lean()
                .exec()
        } catch (error) {
            console.error('Error fetching products:', error)
            throw new HttpError('Could not retrieve products', 400)
        }
    }

    async saveProduct(dto: Products): Promise<void> {
        try {
            await new ProductModel(dto).save()
        } catch (error) {
            console.error('Error saving product:', error)
            throw new HttpError('Could not save product', 400)
        }
    }

    async updateProduct(id: string, dto: Products): Promise<void> {
        try {
            const product = await ProductModel.findByIdAndUpdate(id, {
                $set: {
                    name: dto.name,
                    description: dto.description,
                    price: dto.price,
                    category: dto.category,
                    brand: dto.brand,
                    stock: dto.stock,
                    images: dto.images,
                },
            }).exec()

            if (!product) throw new HttpError('Product not found', 404)
        } catch (error) {
            console.error('Error updating product:', error)
            throw new HttpError('Could not update product', 400)
        }
    }

    async deleteProduct(id: string): Promise<void> {
        try {
            const product = await ProductModel.findByIdAndDelete(id).exec()
            if (!product) throw new HttpError('Product not found', 404)
        } catch (error) {
            console.error('Error deleting product:', error)
            throw new HttpError('Could not delete product', 400)
        }
    }
}
