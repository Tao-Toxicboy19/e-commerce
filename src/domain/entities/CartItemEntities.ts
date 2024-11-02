import { Types } from 'mongoose'

export class CartItemEntities {
    public productId: Types.ObjectId
    public quantity: number
    public subtotal: number

    constructor({
        productId,
        quantity,
        subtotal,
    }: {
        productId: Types.ObjectId
        quantity: number
        subtotal: number
    }) {
        if (!productId || !(productId instanceof Types.ObjectId)) {
            throw new TypeError(
                'productId is required and must be a valid ObjectId'
            )
        }
        if (quantity === undefined || quantity === null) {
            throw new Error('quantity is required')
        }
        if (quantity <= 0) {
            throw new Error('quantity must be greater than zero')
        }
        if (typeof quantity !== 'number') {
            throw new TypeError('quantity must be a number')
        }
        if (subtotal === undefined || subtotal === null) {
            throw new Error('subtotal is required')
        }
        if (subtotal < 0) {
            throw new Error('subtotal must be a positive number')
        }
        if (typeof subtotal !== 'number') {
            throw new TypeError('subtotal must be a number')
        }

        this.productId = productId
        this.quantity = quantity
        this.subtotal = subtotal
    }
}
