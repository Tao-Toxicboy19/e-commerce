import { Shop } from '../../entities/Shop'
import { IShopRepository } from '../../interfaces/IShopRepository'

export class UpdateProductUsecase {
    constructor(private shopRepository: IShopRepository) {}

    async execute(id: string, dto: Shop): Promise<void> {
        return this.shopRepository.updateShop(id, dto)
    }
}
