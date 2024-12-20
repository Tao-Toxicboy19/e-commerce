import { Types } from 'mongoose'
import { ProductsEntities } from '../../domain/entities/ProductsEntities'
import {
    FindProduct,
    IProductsRepository,
} from '../../domain/interfaces/IProductsRepository'
import { HttpError } from '../errors/HttpError'
import { CategoryModel } from '../schemas/CategoriesSchema'
import { ProductModel } from '../schemas/ProductSchema'

interface SearchConditions {
    name?: { $regex: string; $options: string }
    category?: { $regex: string; $options: string } | { $in: string[] } | any
    price?: { $gte: number; $lte: number }
}

export class ProductRepository implements IProductsRepository {
    async products({
        query,
        category,
        range,
        limit = 10,
        page = 1,
    }: FindProduct): Promise<{ count: number; products: ProductsEntities[] }> {
        try {
            let searchConditions: SearchConditions = {}
            const skip = (page - 1) * limit

            // ถ้ามี query ค้นหาตามชื่อผลิตภัณฑ์
            if (query) {
                searchConditions.name = { $regex: query, $options: 'i' }
            }

            // จัดการกับช่วงราคา
            if (range && range.start >= 0 && range.end > 0) {
                searchConditions.price = {
                    $gte: range.start,
                    $lte: range.end,
                }
            }
            // ค้นหาตาม category (จัดการกรณี string และ array)
            if (category) {
                if (Array.isArray(category)) {
                    // ถ้า category เป็น array ให้ใช้ $in เพื่อค้นหาหลายค่า
                    searchConditions.category = { $in: category }
                } else {
                    // ถ้า category เป็น string ให้ใช้ $regex
                    searchConditions.category = {
                        $regex: category,
                        $options: 'i',
                    }
                }
            }
            // นับจำนวนสินค้าทั้งหมดที่ตรงกับเงื่อนไข
            const totalProducts = await ProductModel.countDocuments(
                searchConditions
            )
            // ดึงสินค้าจริง ๆ ที่ตรงกับเงื่อนไข
            const products = await ProductModel.find(searchConditions)
                .select('-reviews -__v')
                .populate('shopOwner', 'shop')
                .skip(skip)
                .limit(limit)
                .lean()
                .exec()

            return { count: totalProducts, products }
        } catch (error) {
            throw new HttpError('Could not retrieve products', 400)
        }
    }

    async saveProduct(dto: ProductsEntities): Promise<void> {
        try {
            // บันทึก product ใหม่
            const product = await new ProductModel(dto).save()

            // ค้นหา category โดยใช้ findOneAndUpdate
            await CategoryModel.findOneAndUpdate(
                { name: dto.category }, // ค้นหา category ตามชื่อ
                {
                    $addToSet: { products: { productId: product._id } }, // เพิ่ม productId เข้าไปใน products (ป้องกันการเพิ่มซ้ำด้วย $addToSet)
                },
                { upsert: true, new: true } // ถ้าไม่มี category นี้ ให้สร้างใหม่ (upsert: true)
            )
        } catch (error) {
            console.log(error)
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

    async searchProduct(productName: string): Promise<string[]> {
        try {
            return await ProductModel.distinct('name', {
                name: { $regex: productName, $options: 'i' },
            }).exec()
        } catch (error) {
            console.log(error)
            throw new HttpError('Could not search product', 400)
        }
    }
}
