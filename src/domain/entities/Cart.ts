import { Types } from 'mongoose'
import { CartItem } from './CartItem'

export class Cart {
    public userId: Types.ObjectId
    public items: CartItem[]
    public totalPrice: number
    public totalQuantity: number

    constructor({
        userId,
        items,
        totalPrice,
        totalQuantity,
    }: {
        userId: Types.ObjectId
        items: CartItem[]
        totalPrice: number
        totalQuantity: number
    }) {
        this.userId = userId
        this.items = items
        this.totalPrice = totalPrice
        this.totalQuantity = totalQuantity
    }
}
