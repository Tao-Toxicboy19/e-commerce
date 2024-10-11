import { Request, Response } from 'express'
import { ProductsUsecase } from '../../domain/usecase/product/ProductsUsecase'
import { SaveProductUsecase } from '../../domain/usecase/product/SaveProductUsecase'
import { HttpError } from '../../infrastructure/errors/HttpError'
import { Products } from '../../domain/entities/Products'
import { Shop } from '../../domain/entities/Shop'
import { productSchema } from '../validate/ProductSchema'
import { querySchema } from '../validate/QuerySchema'
import { ZodError } from 'zod'
import { JwtPayload } from '../../types/JwtPayload'

export class ProductController {
    constructor(
        private prodcutsUsecase: ProductsUsecase,
        private saveProductUsecase: SaveProductUsecase // private updateProductUsecase: UpdateProductUsecase, // private deleteProductUsecase: DeleteProductUsecase
    ) {}

    async productHandler(req: Request, res: Response) {
        try {
            const query = querySchema.parse(req.query)
            const products = await this.prodcutsUsecase.execute({
                ...query,
                range: { start: query.start, end: query.end },
            })
            res.json(products)
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

    async saveProductHandler(req: Request, res: Response) {
        try {
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
            const product = new Products({
                ...body,
                shop,
            })
            // await this.saveProductUsecase.execute(product)
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
