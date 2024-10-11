import { Address } from './Address'

export class Shop {
    public owner: string
    public name: string
    public address: Address

    constructor({
        owner,
        name,
        address,
    }: {
        owner: string
        name: string
        address: Address
    }) {
        this.owner = owner
        this.name = name
        this.address = address
    }
}
