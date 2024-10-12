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
import { ErrorHandler } from '../error/ErrorHandler'

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
           ErrorHandler.handleError(err,res)
        }
    }

    async saveProductHandler(req: Request, res: Response) {
        try {
            const body = productSchema.parse(req.body)

            const payload = req.user as JwtPayload

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
           ErrorHandler.handleError(err,res)
        }
    }
}
