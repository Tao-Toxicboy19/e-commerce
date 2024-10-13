import { AddressDto } from '../../../application/validate/AddressDto'
import { AddressEntities } from '../../entities/AddressEntities'
import { IAddressRepository } from '../../interfaces/IAddressRepository'

export class AddressUsecase {
    constructor(private addressRepository: IAddressRepository) {}

    async execute(userId: string, dto: AddressDto): Promise<void> {
        const address = new AddressEntities({
            ...dto,
            postalCode: dto.postal_code,
        })
        return this.addressRepository.address(userId, address)
    }
}
