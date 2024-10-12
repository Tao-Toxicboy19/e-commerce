import { ICartRepository } from '../../interfaces/ICartRepository'

export class IncreaseItemUsecase {
    constructor(private cartRepository: ICartRepository) {}

    async execute(id: string, userId: string): Promise<void> {
        return this.cartRepository.increaseItem(id, userId)
    }
}
