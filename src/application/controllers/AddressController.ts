import { z } from 'zod'
import { JwtPayload } from 'jsonwebtoken'
import { Request, Response } from 'express'
import { HttpError } from '../../infrastructure/errors/HttpError'
import { Address } from '../../domain/entities/Address'
import { AddressUsecase } from '../../domain/usecase/address/AddressUsecase'

export class AddressController {
    constructor(private addressUsecase: AddressUsecase) {}

    private addressSchema = z.object({
        street: z.string(),
        city: z.string(),
        state: z.string(),
        postal_code: z.number().min(4),
        country: z.string(),
    })

    async addressHandler(req: Request, res: Response) {
        try {
            // ทำการ parse ข้อมูลจาก request body ตาม schema
            const { street, city, state, postal_code, country } =
                this.addressSchema.parse(req.body)

            const payload = req.user as JwtPayload
            if (!payload || !payload.sub) res.status(401).send('Unauthorized')
            const address = new Address({
                street,
                city,
                state,
                postalCode: postal_code,
                country,
            })

            // ส่งข้อมูลไปยัง usecase โดยแปลงจาก postal_code เป็น postalCode
            await this.addressUsecase.execute(payload.sub!, address)

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
