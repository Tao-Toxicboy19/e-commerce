import { Request, Response } from 'express'
import { Address } from '../../domain/entities/Address'
import { AddressUsecase } from '../../domain/usecase/address/AddressUsecase'
import { addressSchema } from '../validate/AddressSchema'
import { JwtPayload } from '../../types/JwtPayload'
import { Effect } from 'effect'
import { ErrorHandler } from '../error/ErrorHandler'

export class AddressController {
    constructor(private addressUsecase: AddressUsecase) {}

    addressHandler(req: Request, res: Response) {
        const validateEffect = Effect.try(() => {
            const body = addressSchema.parse(req.body)

            const payload = req.user as JwtPayload
            if (!payload || !payload.sub) res.status(401).send('Unauthorized')
            const address = new Address({
                ...body,
                postalCode: body.postal_code,
            })

            return { address, userId: payload.sub }
        })

        const addressEffect = Effect.flatMap(
            validateEffect,
            ({ address, userId }) =>
                this.addressUsecase.execute(userId, address)
        )

        Effect.runPromise(addressEffect).then(
            () =>
                res
                    .status(200)
                    .json({ message: 'Address updated successfully' }),
            (err) => ErrorHandler.handleError(err, res)
        )
    }
}
