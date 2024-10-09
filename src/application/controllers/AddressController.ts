import { z } from 'zod'
import { AddressUsecase } from '../../domain/usecase/address/address'
import { JwtPayload } from 'jsonwebtoken'
import { Request, Response } from 'express'
import { HttpError } from '../../infrastructure/errors/HttpError'

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

            // ส่งข้อมูลไปยัง usecase โดยแปลงจาก postal_code เป็น postalCode
            await this.addressUsecase.execute(payload.sub!, {
                street,
                city,
                state,
                postalCode: postal_code, // แปลงเป็น postalCode
                country,
            })

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
