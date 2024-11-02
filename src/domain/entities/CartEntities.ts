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
        if (!userId || !(userId instanceof Types.ObjectId)) {
            throw new TypeError(
                'userId is required and must be a valid ObjectId'
            )
        }
        if (!Array.isArray(items)) {
            throw new TypeError('items must be an array')
        }
        if (typeof totalPrice !== 'number') {
            throw new TypeError('totalPrice must be a number')
        }
        if (typeof totalQuantity !== 'number') {
            throw new TypeError('totalQuantity must be a number')
        }

        this.userId = userId
        this.items = items
        this.totalPrice = totalPrice
        this.totalQuantity = totalQuantity
    }
}
