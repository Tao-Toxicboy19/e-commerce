import { CategoriesEntities } from '../../domain/entities/CategoriesEntities'
import { ICategoriesRepository } from '../../domain/interfaces/ICategoriesRepository'
import { HttpError } from '../errors/HttpError'
import { CategoryModel } from '../schemas/CategoriesSchema'

export class CategoriesRepository implements ICategoriesRepository {
    async findAllCategorise(): Promise<CategoriesEntities[]> {
        try {
            const cate = await CategoryModel.findById({_id:'670b70dccc3c7632186a32be'}).exec()
            console.log(cate)
            return await CategoryModel.aggregate([
                {
                    $project: {
                        name: 1, // แสดงฟิลด์ name
                        count: { $size: '$products' }, // นับจำนวน productId ใน array productCout
                    },
                },
            ]).exec()
        } catch (error) {
            throw new HttpError('Could not retrieve categories', 400)
        }
    }
}
