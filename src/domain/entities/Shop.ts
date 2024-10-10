import { Types } from 'mongoose'
import { Address } from './Address'

export class Shop {
    public owner: Types.ObjectId
    public name: string
    public address: Address

    constructor({
        owner,
        name,
        address,
    }: {
        owner: Types.ObjectId
        name: string
        address: Address
    }) {
        this.owner = owner
        this.name = name
        this.address = address
    }
}
