import { SaveShopDto } from '../../../application/validate/SaveShopDto'
import { AddressEntities } from '../../entities/AddressEntities'
import { ShopEntities } from '../../entities/ShopEntities'
import { IShopRepository } from '../../interfaces/IShopRepository'

export class SaveShopUsecase {
    constructor(private shopRepository: IShopRepository) {}

    async execute(userId: string, dto: SaveShopDto): Promise<void> {
        const addressInstance = new AddressEntities({
            ...dto.address,
            postalCode: dto.address.postal_code,
        })
        const shopInstance = new ShopEntities({
            owner: dto.owner,
            name: dto.name,
            address: addressInstance,
        })
        return this.shopRepository.saveShop(userId, shopInstance)
    }
}
