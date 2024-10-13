import { Types } from 'mongoose'
import { ProductsEntities } from '../../domain/entities/ProductsEntities'
import {
    FindProduct,
    IProductsRepository,
} from '../../domain/interfaces/IProductsRepository'
import { HttpError } from '../errors/HttpError'
import { CategoriesModel } from '../schemas/CategoriesSchema'
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
    }: FindProduct): Promise<ProductsEntities[]> {
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
                .populate('shopOwner', 'shop')
                .lean()
                .exec()
        } catch (error) {
            throw new HttpError('Could not retrieve products', 400)
        }
    }

    async saveProduct(dto: ProductsEntities): Promise<void> {
        try {
            // บันทึก product ใหม่
            const product = await new ProductModel(dto).save()

            // ตรวจสอบว่า category ที่ต้องการมีอยู่ใน DB หรือไม่
            let category = await CategoriesModel.findOne({
                name: dto.category,
            })
                .select('name')
                .exec()

            if (!category) {
                // ถ้า category ไม่มี ให้สร้าง category ใหม่
                category = new CategoriesModel({
                    name: dto.category,
                    cout: [product._id as Types.ObjectId], // แปลง _id ให้เป็น Types.ObjectId
                })
            } else {
                // ถ้ามี category แล้ว ให้เพิ่ม productId เข้าไปใน cout array
                if (!category.cout.includes(product._id as Types.ObjectId)) {
                    category.cout.push(product._id as Types.ObjectId)
                }
            }

            // บันทึกการเปลี่ยนแปลงใน category
            await category.save()
        } catch (error) {
            throw new HttpError('Could not save product', 400)
        }
    }

    async updateProduct(dto: ProductsEntities): Promise<void> {
        try {
            const product = await ProductModel.findByIdAndUpdate(
                { _id: dto.id, shopOwner: dto.shopOwner },
                {
                    $set: {
                        name: dto.name,
                        description: dto.description,
                        price: dto.price,
                        category: dto.category,
                        brand: dto.brand,
                        stock: dto.stock,
                        images: dto.images,
                    },
                }
            ).exec()
            if (!product) throw new HttpError('Product not found', 404)
        } catch (error) {
            throw new HttpError('Could not update product', 400)
        }
    }

    async deleteProduct(id: string): Promise<void> {
        try {
            const product = await ProductModel.findByIdAndDelete(id).exec()
            if (!product) throw new HttpError('Product not found', 404)
        } catch (error) {
            throw new HttpError('Could not delete product', 400)
        }
    }
}
