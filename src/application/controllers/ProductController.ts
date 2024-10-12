import { Request, Response } from 'express'
import { ProductsUsecase } from '../../domain/usecase/product/ProductsUsecase'
import { SaveProductUsecase } from '../../domain/usecase/product/SaveProductUsecase'
import { productSchema } from '../validate/ProductSchema'
import { querySchema } from '../validate/QuerySchema'
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
            ErrorHandler.handleError(err, res)
        }
    }

    async saveProductHandler(req: Request, res: Response) {
        try {
            const body = productSchema.parse(req.body)
            const payload = req.user as JwtPayload
            const files = req.files as Express.Multer.File[]

            await this.saveProductUsecase.execute({
                userId: payload.sub,
                dto: body,
                files,
            })
            res.json({ message: 'OK' })
        } catch (err) {
            ErrorHandler.handleError(err, res)
        }
    }
}
