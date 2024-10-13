export class CategoriesEntities {
    public name: string
    public productCount: number

    constructor({
        name,
        productCount,
    }: {
        name: string
        productCount: number
    }) {
        this.name = name
        this.productCount = productCount
    }
}
