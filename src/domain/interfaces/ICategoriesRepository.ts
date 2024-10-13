import { CategoriesEntities } from '../entities/CategoriesEntities'

export interface ICategoriesRepository {
    findAllCategorise(): Promise<CategoriesEntities[]>
}
