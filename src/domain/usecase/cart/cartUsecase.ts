import { CartEntities } from '../../entities/CartEntities'
import { ICartRepository } from '../../interfaces/ICartRepository'

export class CartUsecase {
    constructor(private cartRepository: ICartRepository) {}

    async execute(userId: string): Promise<CartEntities> {
        return this.cartRepository.cart(userId)
    }
}
