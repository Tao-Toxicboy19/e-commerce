import { Request, Response } from 'express'
import { SaveShopUsecase } from '../../domain/usecase/shop/SaveShopUsecase'
import { JwtPayload } from '../../types/JwtPayload'
import { ErrorHandler } from '../error/ErrorHandler'
import { saveShopDto } from '../validate/SaveShopDto'

export class ShopController {
    constructor(private saveShopUsecase: SaveShopUsecase) {}

    async saveShopHandler(req: Request, res: Response) {
        try {
            const body = saveShopDto.parse(req.body)
            const payload = req.user as JwtPayload

            await this.saveShopUsecase.execute(payload.sub, body)

            res.json({ message: 'OK' })
        } catch (err) {
            ErrorHandler.handleError(err, res)
        }
    }
}
