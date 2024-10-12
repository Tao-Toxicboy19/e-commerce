import { Request, Response } from 'express'
import { ProductsUsecase } from '../../domain/usecase/product/ProductsUsecase'
import { SaveProductUsecase } from '../../domain/usecase/product/SaveProductUsecase'
import { UpdateProductUsecase } from '../../domain/usecase/product/UpdateProductUsecase'
import { JwtPayload } from '../../types/JwtPayload'
import { ErrorHandler } from '../error/ErrorHandler'
import { queryDto } from '../validate/QueryDto'
import { productDto } from '../validate/products/ProductDto'
import { updateProductDto } from '../validate/products/UpdateProductDto'
import { DeleteProductUsecase } from '../../domain/usecase/product/DeleteProductUsecase'
import { deleteProductDto } from '../validate/products/DeleteProductDto'

export class ProductController {
    constructor(
        private prodcutsUsecase: ProductsUsecase,
        private saveProductUsecase: SaveProductUsecase,
        private updateProductUsecase: UpdateProductUsecase,
        private deleteProductUsecase: DeleteProductUsecase
    ) {}

    async productHandler(req: Request, res: Response) {
        try {
            const query = queryDto.parse(req.query)
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
            const body = productDto.parse(req.body)
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

    async updateProductHandler(req: Request, res: Response) {
        try {
            const body = updateProductDto.parse(req.body)
            const { sub } = req.user as JwtPayload
            const files = req.files as Express.Multer.File[]

            await this.updateProductUsecase.execute({
                userId: sub,
                dto: body,
                files,
            })
            res.json({ message: 'ok' }).status(200)
        } catch (error) {
            ErrorHandler.handleError(error, res)
        }
    }

    async deleteProductHandler(req: Request, res: Response) {
        try {
            const { id } = deleteProductDto.parse(req.params)
            await this.deleteProductUsecase.execute(id)
            res.json({ message: 'OK' }).status(200)
        } catch (error) {
            ErrorHandler.handleError(error, res)
        }
    }
}
