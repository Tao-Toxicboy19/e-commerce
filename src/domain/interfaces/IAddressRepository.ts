import { AddressEntities } from '../entities/AddressEntities'

export interface IAddressRepository {
    address(sub: string, dto: AddressEntities): Promise<void>
}
