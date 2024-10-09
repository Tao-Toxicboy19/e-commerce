type Review = {
    userId: string
    rating: number
    comment: string
}

export class Products {
    name: string
    description: string
    price: number
    category: string
    brand: string
    stock: number
    images: string[]
    reviews: Review[]

    constructor(
        name: string,
        description: string,
        price: number,
        category: string,
        brand: string,
        stock: number,
        images: string[],
        reviews: Review[]
    ) {
        this.name = name
        this.description = description
        this.price = price
        this.category = category
        this.brand = brand
        this.stock = stock
        this.images = images
        this.reviews = reviews
    }
}
