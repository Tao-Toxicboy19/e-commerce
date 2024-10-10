import { Shop } from '../../entities/Shop'
import { IShopRepository } from '../../interfaces/IShopRepository'

export class SaveProductUsecase {
    constructor(private shopRepository: IShopRepository) {}

    async execute(dto: Shop): Promise<void> {
        return this.shopRepository.saveShop(dto)
    }
}
