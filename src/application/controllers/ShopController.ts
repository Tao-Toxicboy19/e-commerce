import { Request, Response } from 'express'
import { ZodError } from 'zod'
import { HttpError } from '../../infrastructure/errors/HttpError'
import { SaveShopUsecase } from '../../domain/usecase/shop/SaveShopUsecase'
import { saveShopSchema } from '../validate/SaveShopSchema'
import { Shop } from '../../domain/entities/Shop'
import { Address } from '../../domain/entities/Address'
import { JwtPayload } from '../../types/JwtPayload'
import { ErrorHandler } from '../error/ErrorHandler'

export class ShopController {
    constructor(private saveShopUsecase: SaveShopUsecase) {}

    async saveShopHandler(req: Request, res: Response) {
        try {
            const { owner, name, address } = saveShopSchema.parse(req.body)

            const payload = req.user as JwtPayload

            const addressInstance = new Address({
                ...address,
                postalCode: address.postal_code,
            })
            const shopInstance = new Shop({
                owner,
                name,
                address: addressInstance,
            })

            await this.saveShopUsecase.execute(
                payload.sub as string,
                shopInstance
            )

            res.json({ message: 'OK' })
        } catch (err) {
            ErrorHandler.handleError(err,res)
        }
    }
}
