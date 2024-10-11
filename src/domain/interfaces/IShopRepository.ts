import { Shop } from '../entities/Shop'

export interface IShopRepository {
    saveShop(id: string, dto: Shop): Promise<void>
}
