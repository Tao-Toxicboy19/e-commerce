import { ShopEntities } from "../entities/ShopEntities";

export interface IShopRepository {
    saveShop(userId: string, dto: ShopEntities): Promise<void>
}
