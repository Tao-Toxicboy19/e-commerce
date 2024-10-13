import { CategoriesEntities } from '../../entities/CategoriesEntities'
import { ICategoriesRepository } from '../../interfaces/ICategoriesRepository'

export class FindAllCategoriseUsecase {
    constructor(private categoriesRepository: ICategoriesRepository) {}

    async execute(): Promise<CategoriesEntities[]> {
        return this.categoriesRepository.findAllCategorise()
    }
}
