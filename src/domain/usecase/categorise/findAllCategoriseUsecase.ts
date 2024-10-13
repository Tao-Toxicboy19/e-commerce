import { CategoriesEntities } from '../../entities/CategoriesEntities'
import { ICategoriseRepository } from '../../interfaces/ICategoriseRepository'

export class FindAllCategorise {
    constructor(private categoriseRepository: ICategoriseRepository) {}

    async execute(): Promise<CategoriesEntities[]> {
        return this.categoriseRepository.findAllCategorise()
    }
}
