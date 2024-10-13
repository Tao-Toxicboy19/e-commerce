import { Types } from 'mongoose'
import { CartItemEntities } from './CartItemEntities'

export class CartEntities {
    public userId: Types.ObjectId
    public items: CartItemEntities[]
    public totalPrice: number
    public totalQuantity: number

    constructor({
        userId,
        items,
        totalPrice,
        totalQuantity,
    }: {
        userId: Types.ObjectId
        items: CartItemEntities[]
        totalPrice: number
        totalQuantity: number
    }) {
        this.userId = userId
        this.items = items
        this.totalPrice = totalPrice
        this.totalQuantity = totalQuantity
    }
}
