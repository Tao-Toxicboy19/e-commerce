import { Shop } from '../entities/Shop'

export interface IShopRepository {
    saveShop(userId: string, dto: Shop): Promise<void>
}
