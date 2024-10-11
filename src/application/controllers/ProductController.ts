import { Request, Response } from 'express'
import { ProductsUsecase } from '../../domain/usecase/product/ProductsUsecase'
import { SaveProductUsecase } from '../../domain/usecase/product/SaveProductUsecase'
import { Products } from '../../domain/entities/Products'
import { Shop } from '../../domain/entities/Shop'
import { productSchema } from '../validate/ProductSchema'
import { querySchema } from '../validate/QuerySchema'
import { JwtPayload } from '../../types/JwtPayload'
import { Effect } from 'effect'
import { ErrorHandler } from '../error/ErrorHandler'

export class ProductController {
    constructor(
        private prodcutsUsecase: ProductsUsecase,
        private saveProductUsecase: SaveProductUsecase // private updateProductUsecase: UpdateProductUsecase, // private deleteProductUsecase: DeleteProductUsecase
    ) {}

    productHandler(req: Request, res: Response) {
        const validateEffect = Effect.try(() => querySchema.parse(req.query))
        const productsEffect = Effect.flatMap(validateEffect, (query) =>
            this.prodcutsUsecase.execute({
                ...query,
                range: { start: query.start, end: query.end },
            })
        )
        Effect.runPromise(productsEffect).then(
            (products) => res.status(200).json(products),
            (err) => ErrorHandler.handleError(err, res)
        )
    }

    saveProductHandler(req: Request, res: Response) {
        const validateEffect = Effect.try(() => {
            const body = productSchema.parse(req.body)
            const payload = req.user as JwtPayload
            if (!payload || !payload.sub) res.status(401).send('Unauthorized')

            const shop = new Shop({
                owner: payload.sub as string,
                address: {
                    ...body.shop.address,
                    postalCode: body.shop.address.postal_code,
                },
                name: body.shop.name,
            })
            return new Products({
                ...body,
                shop,
            })
        })

        const saveEffect = Effect.flatMap(validateEffect, (product) =>
            this.saveProductUsecase.execute(product)
        )

        Effect.runPromise(saveEffect).then(
            () => res.status(200).json({ message: 'OK' }),
            (err) => ErrorHandler.handleError(err, res)
        )
    }
}
