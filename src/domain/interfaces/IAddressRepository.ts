import { Address } from '../entities/Address'

export interface IAddressRepository {
    address(sub: string, dto: Address): Promise<void>
}
