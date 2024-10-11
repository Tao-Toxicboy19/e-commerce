import { Effect } from 'effect'
import { Address } from '../../entities/Address'
import { IAddressRepository } from '../../interfaces/IAddressRepository'

export class AddressUsecase {
    constructor(private addressRepository: IAddressRepository) {}

    execute(sub: string, dto: Address): Effect.Effect<void, Error> {
        return this.addressRepository.address(sub, dto)
    }
}
