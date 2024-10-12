import { Types } from 'mongoose'
import { Images } from './Images'

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
    public images: Images[]
    public shopOwner: Types.ObjectId

    constructor({
        name,
        description,
        price,
        category,
        brand,
        stock,
        images,
        shopOwner,
    }: {
        name: string
        description: string
        price: number
        category: string
        brand: string
        stock: number
        images: Images[]
        shopOwner: Types.ObjectId
    }) {
        this.name = name
        this.description = description
        this.price = price
        this.category = category
        this.brand = brand
        this.stock = stock
        this.images = images
        this.shopOwner = shopOwner
    }
}
