import { Types } from 'mongoose'

export class CartItem {
    public productId: Types.ObjectId
    public name: string
    public quantity: number
    public subtotal: number

    constructor({
        productId,
        name,
        quantity,
        subtotal,
    }: {
        productId: Types.ObjectId
        name: string
        quantity: number
        subtotal: number
    }) {
        this.productId = productId
        this.name = name
        this.quantity = quantity
        this.subtotal = subtotal
    }
}
