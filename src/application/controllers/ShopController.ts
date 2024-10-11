import { Request, Response } from 'express'
import { ZodError } from 'zod'
import { HttpError } from '../../infrastructure/errors/HttpError'
import { SaveShopUsecase } from '../../domain/usecase/shop/SaveShopUsecase'
import { saveShopSchema } from '../validate/SaveShopSchema'
import { Shop } from '../../domain/entities/Shop'
import { Address } from '../../domain/entities/Address'
import { JwtPayload } from '../../types/JwtPayload'

export class ShopController {
    constructor(private saveShopUsecase: SaveShopUsecase) {}

    async saveShopHandler(req: Request, res: Response) {
        try {
            const { owner, name, address } = saveShopSchema.parse(req.body)

            const payload = req.user as JwtPayload
            if (!payload || !payload.sub) res.status(401).send('Unauthorized')

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
            if (err instanceof ZodError) {
                res.status(400).send({
                    message: err.errors,
                    statusCode: 400,
                })
            } else if (err instanceof HttpError) {
                res.status(err.statusCode).send({
                    message: err.message,
                    statusCode: err.statusCode,
                })
            } else {
                res.status(500).send({
                    message: err,
                    statusCode: 500,
                })
            }
        }
    }
}
