export class CategoriesEntities {
    public name: string
    public cout: number

    constructor({
        name,
        cout,
    }: {
        name: string
        cout: number
    }) {
        this.name = name
        this.cout = cout
    }
}
