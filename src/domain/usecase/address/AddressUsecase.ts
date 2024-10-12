import { AddressType } from '../../../application/validate/AddressSchema'
import { Address } from '../../entities/Address'
import { IAddressRepository } from '../../interfaces/IAddressRepository'

export class AddressUsecase {
    constructor(private addressRepository: IAddressRepository) {}

    async execute(userId: string, dto: AddressType): Promise<void> {
        const address = new Address({
            ...dto,
            postalCode: dto.postal_code,
        })
        return this.addressRepository.address(userId, address)
    }
}
