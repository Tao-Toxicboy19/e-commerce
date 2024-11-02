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
        if (
            name === undefined ||
            name === null ||
            typeof name !== 'string' ||
            !name.trim()
        ) {
            throw new Error('name is required')
        }

        if (
            productCount === undefined ||
            productCount === null ||
            typeof productCount !== 'number' ||
            productCount <= 0
        ) {
            throw new Error('productCount must be a positive number')
        }

        this.name = name
        this.productCount = productCount
    }
}
