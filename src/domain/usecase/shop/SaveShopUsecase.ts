import { SaveShopType } from '../../../application/validate/SaveShopSchema'
import { Address } from '../../entities/Address'
import { Shop } from '../../entities/Shop'
import { IShopRepository } from '../../interfaces/IShopRepository'

export class SaveShopUsecase {
    constructor(private shopRepository: IShopRepository) {}

    async execute(userId: string, dto: SaveShopType): Promise<void> {
        const addressInstance = new Address({
            ...dto.address,
            postalCode: dto.address.postal_code,
        })
        const shopInstance = new Shop({
            owner: dto.owner,
            name: dto.name,
            address: addressInstance,
        })
        return this.shopRepository.saveShop(userId, shopInstance)
    }
}
