import { Shop } from '../../entities/Shop'
import { IShopRepository } from '../../interfaces/IShopRepository'

export class SaveShopUsecase {
    constructor(private shopRepository: IShopRepository) {}

    async execute(id: string, dto: Shop): Promise<void> {
        return this.shopRepository.saveShop(id, dto)
    }
}
