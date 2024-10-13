import { CategoriesEntities } from '../../domain/entities/CategoriesEntities'
import { ICategoriesRepository } from '../../domain/interfaces/ICategoriesRepository'
import { HttpError } from '../errors/HttpError'
import { CategoriesModel } from '../schemas/CategoriesSchema'

export class CategoriesRepository implements ICategoriesRepository {
    async findAllCategorise(): Promise<CategoriesEntities[]> {
        try {
            return await CategoriesModel.aggregate([
                {
                    $project: {
                        name: 1, // แสดงฟิลด์ name
                        cout: { $size: '$cout' }, // นับจำนวน productId ใน array cout
                    },
                },
            ]).exec()
        } catch (error) {
            throw new HttpError('Could not retrieve categories', 400)
        }
    }
}
