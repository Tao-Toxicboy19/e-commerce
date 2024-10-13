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
        this.productId = productId
        this.quantity = quantity
        this.subtotal = subtotal
    }
}
