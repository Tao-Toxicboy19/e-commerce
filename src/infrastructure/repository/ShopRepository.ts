import { Effect } from 'effect'
import { Shop } from '../../domain/entities/Shop'
import { IShopRepository } from '../../domain/interfaces/IShopRepository'
import { UserModel } from '../schemas/UserSchema'

export class ShopRepository implements IShopRepository {
    saveShop(id: string, dto: Shop): Effect.Effect<void, Error> {
        return Effect.tryPromise(async () => {
            const shop = await UserModel.findByIdAndUpdate(
                { _id: id },
                {
                    role: 'shop',
                    shop: dto,
                },
                { new: true, runValidators: true }
            ).exec()

            if (!shop) throw new Error('User not found or update failed.')
        })
    }
}
