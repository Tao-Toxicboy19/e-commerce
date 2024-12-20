import { CartDto } from '../../../application/validate/cart/cartDto'
import { ICartRepository } from '../../interfaces/ICartRepository'

export class IncreaseItemUsecase {
    constructor(private cartRepository: ICartRepository) {}

    async execute(userId: string, { id, productId }: CartDto): Promise<void> {
        return this.cartRepository.increaseItem({ id, userId, productId })
    }
}
