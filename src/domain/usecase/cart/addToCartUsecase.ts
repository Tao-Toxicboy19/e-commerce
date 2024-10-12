import { CartItem } from '../../entities/CartItem'
import { ICartRepository } from '../../interfaces/ICartRepository'

export class AddToCartUsecase {
    constructor(private cartRepository: ICartRepository) {}

    async execute(dto: CartItem): Promise<void> {
        return this.cartRepository.addToCart(dto)
    }
}
