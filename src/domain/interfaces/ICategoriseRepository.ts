import { CategoriesEntities } from '../entities/CategoriesEntities'

export interface ICategoriseRepository {
    findAllCategorise(): Promise<CategoriesEntities[]>
}
