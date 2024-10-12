import { Request, Response } from 'express'
import { AddressUsecase } from '../../domain/usecase/address/AddressUsecase'
import { JwtPayload } from '../../types/JwtPayload'
import { ErrorHandler } from '../error/ErrorHandler'
import { addressDto } from '../validate/AddressDto'

export class AddressController {
    constructor(private addressUsecase: AddressUsecase) {}

    async addressHandler(req: Request, res: Response) {
        try {
            const body = addressDto.parse(req.body)
            const payload = req.user as JwtPayload

            await this.addressUsecase.execute(payload.sub as string, body)

            res.status(200).send('Address updated successfully')
        } catch (err) {
            ErrorHandler.handleError(err, res)
        }
    }
}
