import { Address } from '../../entities/Address'
import { IAddressRepository } from '../../interfaces/IAddressRepository'

export class AddressUsecase {
    constructor(private addressRepository: IAddressRepository) {}

    async execute(sub: string, dto: Address): Promise<string> {
        return this.addressRepository.address(sub, dto)
    }
}
