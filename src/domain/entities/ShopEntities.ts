import { AddressEntities } from './AddressEntities'

export class ShopEntities {
    public owner: string
    public name: string
    public address: AddressEntities

    constructor({
        owner,
        name,
        address,
    }: {
        owner: string
        name: string
        address: AddressEntities
    }) {
        this.owner = owner
        this.name = name
        this.address = address
    }
}
