import { ICartRepository } from '../../interfaces/ICartRepository'

export class ReduceItemUsecase {
    constructor(private cartRepository: ICartRepository) {}

    async execute(id: string, userId: string): Promise<void> {
        return this.cartRepository.reduceItem(id, userId)
    }
}
