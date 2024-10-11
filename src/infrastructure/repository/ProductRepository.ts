import { Effect } from 'effect'
import { ProductQuery, Products } from '../../domain/entities/Products'
import { IProductsRepository } from '../../domain/interfaces/IProductsRepository'
import { ProductModel } from '../schemas/ProductSchema'
import { HttpError } from '../errors/HttpError'

interface SearchConditions {
    name?: { $regex: string; $options: string }
    category?: { $regex: string; $options: string }
    price?: { $gte: number; $lte: number }
}

export class ProductRepository implements IProductsRepository {
    products({
        query,
        category,
        range,
    }: ProductQuery): Effect.Effect<Products[], Error> {
        return Effect.tryPromise(async () => {
            // สร้าง search conditions ตามเงื่อนไขที่ได้รับ
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

            // ค้นหาผลิตภัณฑ์ตามเงื่อนไข
            return await ProductModel.find(searchConditions)
                .select('-reviews -__v') // ลบฟิลด์ที่ไม่ต้องการ
                .lean()
                .exec()
        })
    }

    saveProduct(dto: Products): Effect.Effect<void, Error> {
        return Effect.tryPromise(async () => {
            await new ProductModel({
                name: dto.name,
                description: dto.description,
                price: dto.price,
                category: dto.category,
                brand: dto.brand,
                stock: dto.stock,
                images: dto.images,
                shop: dto.shop,
            }).save()
        })
    }

    updateProduct(id: string, dto: Products): Effect.Effect<void, Error> {
        return Effect.tryPromise(async () => {
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
            if (!product) {
                throw new HttpError('Product not found', 404) // ใช้ HttpError สำหรับ 404
            }
        })
    }

    deleteProduct(id: string): Effect.Effect<void, Error> {
        return Effect.tryPromise(async () => {
            const result = await ProductModel.findByIdAndDelete(id).exec()
            if (!result) throw new HttpError('Product not found', 404) // ใช้ HttpError สำหรับ 404
        })
    }
}
