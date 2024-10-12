import { Cart } from '../../domain/entities/Cart'
import { CartItem } from '../../domain/entities/CartItem'
import { ICartRepository } from '../../domain/interfaces/ICartRepository'

export class CartRepository implements ICartRepository {
    addToCart(dto: CartItem): Promise<void> {}

    cart(userId: string): Promise<Cart> {}

    increaseItem(id: string, userId: string): Promise<void> {}

    reduceItem(id: string, userId: string): Promise<void> {}
}
