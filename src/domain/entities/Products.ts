import { Types } from 'mongoose'

export type ProductQuery = {
    query?: string
    category?: string
    range?: { start: number; end: number }
}

export class Products {
    public name: string
    public description: string
    public price: number
    public category: string
    public brand: string
    public stock: number
    public images: string[]
    public shopId: Types.ObjectId

    constructor({
        name,
        description,
        price,
        category,
        brand,
        stock,
        images,
        shopId,
    }: {
        name: string
        description: string
        price: number
        category: string
        brand: string
        stock: number
        images: string[]
        shopId: Types.ObjectId
    }) {
        this.name = name
        this.description = description
        this.price = price
        this.category = category
        this.brand = brand
        this.stock = stock
        this.images = images
        this.shopId = shopId
    }
}
