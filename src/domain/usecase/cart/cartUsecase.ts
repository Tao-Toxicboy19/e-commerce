import { Cart } from '../../entities/Cart'
import { ICartRepository } from '../../interfaces/ICartRepository'

export class CartUsecase {
    constructor(private cartRepository: ICartRepository) {}

    async execute(userId: string): Promise<Cart> {
        return this.cartRepository.cart(userId)
    }
}
