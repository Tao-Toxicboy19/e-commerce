import { Cart } from '../entities/Cart'
import { CartItem } from '../entities/CartItem'

export interface ICartRepository {
    addToCart(dto: CartItem): Promise<void>
    cart(userId: string): Promise<Cart>
    increaseItem(id: string, userId: string): Promise<void>
    reduceItem(id: string, userId: string): Promise<void>
}
