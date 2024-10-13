import { CartDto } from '../../../application/validate/cart/cartDto'
import { ICartRepository } from '../../interfaces/ICartRepository'

export class DeleteProductOnCartUsecase {
    constructor(private cartRepository: ICartRepository) {}

    async execute(userId: string, { id, productId }: CartDto): Promise<void> {
        return this.cartRepository.deleteProductOnCart({
            userId,
            id,
            productId,
        })
    }
}
