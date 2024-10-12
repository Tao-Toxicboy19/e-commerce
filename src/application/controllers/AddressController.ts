import { Request, Response } from 'express'
import { HttpError } from '../../infrastructure/errors/HttpError'
import { Address } from '../../domain/entities/Address'
import { AddressUsecase } from '../../domain/usecase/address/AddressUsecase'
import { addressSchema } from '../validate/AddressSchema'
import { JwtPayload } from '../../types/JwtPayload'
import { ErrorHandler } from '../error/ErrorHandler'

export class AddressController {
    constructor(private addressUsecase: AddressUsecase) {}

    async addressHandler(req: Request, res: Response) {
        try {
            // ทำการ parse ข้อมูลจาก request body ตาม schema
            const body = addressSchema.parse(req.body)

            const payload = req.user as JwtPayload
            const address = new Address({
                ...body,
                postalCode: body.postal_code,
            })

            // ส่งข้อมูลไปยัง usecase โดยแปลงจาก postal_code เป็น postalCode
            await this.addressUsecase.execute(payload.sub as string, address)

            res.status(200).send('Address updated successfully')
        } catch (err) {
            ErrorHandler.handleError(err, res)
        }
    }
}
