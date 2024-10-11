import { Effect } from 'effect'
import { Shop } from '../entities/Shop'

export interface IShopRepository {
    saveShop(id: string, dto: Shop): Effect.Effect<void, Error>
}
