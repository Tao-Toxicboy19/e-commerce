import { ProductQuery, Products } from '../../domain/entities/Products'
import { IProductsRepository } from '../../domain/interfaces/IProductsRepository'
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

            const products = await ProductModel.find(searchConditions)
                .select('-reviews -__v')
                .lean()
                .exec()
            return products
        } catch (error) {
            console.error('Error fetching products:', error)
            throw new Error('Could not retrieve products')
        }
    }

    async saveProduct(dto: Products): Promise<void> {
        try {
            const newProduct = new ProductModel({
                name: dto.name,
                description: dto.description,
                price: dto.price,
                category: dto.category,
                brand: dto.brand,
                stock: dto.stock,
                images: dto.images,
            })

            await newProduct.save()
        } catch (error) {
            console.error('Error saving product:', error)
            throw new Error('Could not save product')
        }
    }

    async updateProduct(id: string, dto: Products): Promise<void> {
        try {
            const result = await ProductModel.findByIdAndUpdate(id, {
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

            if (!result) {
                throw new Error('Product not found')
            }
        } catch (error) {
            console.error('Error updating product:', error)
            throw new Error('Could not update product')
        }
    }

    async deleteProduct(id: string): Promise<void> {
        try {
            const result = await ProductModel.findByIdAndDelete(id).exec()
            if (!result) {
                throw new Error('Product not found')
            }
        } catch (error) {
            console.error('Error deleting product:', error)
            throw new Error('Could not delete product')
        }
    }
}
