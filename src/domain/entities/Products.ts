import { Shop } from './Shop'

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
    public shop: Shop

    constructor({
        name,
        description,
        price,
        category,
        brand,
        stock,
        images,
        shop,
    }: {
        name: string
        description: string
        price: number
        category: string
        brand: string
        stock: number
        images: string[]
        shop: Shop
    }) {
        this.name = name
        this.description = description
        this.price = price
        this.category = category
        this.brand = brand
        this.stock = stock
        this.images = images
        this.shop = shop
    }
}
