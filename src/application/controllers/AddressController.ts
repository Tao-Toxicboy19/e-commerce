import { Request, Response } from 'express'
import { HttpError } from '../../infrastructure/errors/HttpError'
import { Address } from '../../domain/entities/Address'
import { AddressUsecase } from '../../domain/usecase/address/AddressUsecase'
import { addressSchema } from '../validate/AddressSchema'
import { JwtPayload } from '../../types/JwtPayload'

export class AddressController {
    constructor(private addressUsecase: AddressUsecase) {}

    async addressHandler(req: Request, res: Response) {
        try {
            // ทำการ parse ข้อมูลจาก request body ตาม schema
            const body = addressSchema.parse(req.body)

            const payload = req.user as JwtPayload
            if (!payload || !payload.sub) res.status(401).send('Unauthorized')
            const address = new Address({
                ...body,
                postalCode: body.postal_code,
            })

            // ส่งข้อมูลไปยัง usecase โดยแปลงจาก postal_code เป็น postalCode
            await this.addressUsecase.execute(payload.sub as string, address)

            res.status(200).send('Address updated successfully')
        } catch (err) {
            if (err instanceof HttpError) {
                res.status(err.statusCode).send({
                    message: err.message,
                    statusCode: err.statusCode,
                })
            } else {
                res.status(500).send({
                    message: err instanceof Error ? err.message : String(err),
                    statusCode: 500,
                })
            }
        }
    }
}
