import { Effect } from 'effect'
import { Shop } from '../../entities/Shop'
import { IShopRepository } from '../../interfaces/IShopRepository'

export class SaveShopUsecase {
    constructor(private shopRepository: IShopRepository) {}

    execute(id: string, dto: Shop): Effect.Effect<void, Error> {
        return this.shopRepository.saveShop(id, dto)
    }
}
