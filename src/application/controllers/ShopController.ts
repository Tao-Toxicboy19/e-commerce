import { Request, Response } from 'express'
import { HttpError } from '../../infrastructure/errors/HttpError'
import { SaveShopUsecase } from '../../domain/usecase/shop/SaveShopUsecase'
import { saveShopSchema } from '../validate/SaveShopSchema'
import { Shop } from '../../domain/entities/Shop'
import { Address } from '../../domain/entities/Address'
import { JwtPayload } from '../../types/JwtPayload'
import { Effect } from 'effect'
import { ErrorHandler } from '../error/ErrorHandler'

export class ShopController {
    constructor(private saveShopUsecase: SaveShopUsecase) {}

    saveShopHandler(req: Request, res: Response) {
        const validateEffect = Effect.try(() => {
            const { owner, name, address } = saveShopSchema.parse(req.body)
            const payload = req.user as JwtPayload

            if (!payload || !payload.sub) {
                throw new HttpError('Unauthorized', 401)
            }

            const addressInstance = new Address({
                ...address,
                postalCode: address.postal_code,
            })

            const shopInstance = new Shop({
                owner,
                name,
                address: addressInstance,
            })

            return { shopInstance, userId: payload.sub }
        })

        // Combine validation Effect and save Effect
        const saveEffect = Effect.flatMap(
            validateEffect,
            ({ shopInstance, userId }) =>
                this.saveShopUsecase.execute(userId, shopInstance)
        )

        // Run Effect and handle result/error
        Effect.runPromise(saveEffect).then(
            () => res.json({ message: 'OK' }),
            (err) => ErrorHandler.handleError(err, res)
        )
    }
}
