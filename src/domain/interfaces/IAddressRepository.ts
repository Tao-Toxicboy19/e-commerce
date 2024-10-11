import { Effect } from 'effect'
import { Address } from '../entities/Address'

export interface IAddressRepository {
    address(sub: string, dto: Address): Effect.Effect<void, Error>
}
