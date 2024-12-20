import { ShopEntities } from '../../domain/entities/ShopEntities'
import { IShopRepository } from '../../domain/interfaces/IShopRepository'
import { HttpError } from '../errors/HttpError'
import { UserModel } from '../schemas/UserSchema'

export class ShopRepository implements IShopRepository {
    async saveShop(id: string, dto: ShopEntities): Promise<void> {
        const shop = await UserModel.findByIdAndUpdate(
            { _id: id },
            {
                role: 'shop',
                shop: dto,
            },
            { new: true, runValidators: true }
        ).exec()

        if (!shop) throw new HttpError('User not found or update failed.', 404)
    }
}
