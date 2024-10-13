import { CartEntities } from '../entities/CartEntities'

export interface CartActionParams {
    id: string
    userId: string
    productId: string
}

export interface ICartRepository {
    cart(userId: string): Promise<CartEntities>
    increaseItem(dto: CartActionParams): Promise<void>
    reduceItem(dto: CartActionParams): Promise<void>
    deleteProductOnCart(dto: CartActionParams): Promise<void>
}
