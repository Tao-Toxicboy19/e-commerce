import { Shop } from '../entities/Shop'

export interface IShopRepository {
    saveShop(dto: Shop): Promise<void>
    updateShop(id: string, dto: Shop): Promise<void>
}
