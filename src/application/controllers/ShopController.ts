import { Request, Response } from 'express'
import { SaveShopUsecase } from '../../domain/usecase/shop/SaveShopUsecase'
import { saveShopSchema } from '../validate/SaveShopSchema'
import { JwtPayload } from '../../types/JwtPayload'
import { ErrorHandler } from '../error/ErrorHandler'

export class ShopController {
    constructor(private saveShopUsecase: SaveShopUsecase) {}

    async saveShopHandler(req: Request, res: Response) {
        try {
            const body = saveShopSchema.parse(req.body)
            const payload = req.user as JwtPayload

            await this.saveShopUsecase.execute(payload.sub, body)

            res.json({ message: 'OK' })
        } catch (err) {
            ErrorHandler.handleError(err, res)
        }
    }
}
