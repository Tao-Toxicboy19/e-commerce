import { Request, Response } from 'express'
import { ProductsUsecase } from '../../domain/usecase/product/ProductsUsecase'
import { SaveProductUsecase } from '../../domain/usecase/product/SaveProductUsecase'
import { HttpError } from '../../infrastructure/errors/HttpError'
import { z } from 'zod'
import { Products } from '../../domain/entities/Products'
import { Types } from 'mongoose'

export class ProductController {
    constructor(
        private prodcutsUsecase: ProductsUsecase,
        private saveProductUsecase: SaveProductUsecase // private updateProductUsecase: UpdateProductUsecase, // private deleteProductUsecase: DeleteProductUsecase
    ) {}

    private productSchema = z.object({
        name: z.string(),
        description: z.string(),
        price: z.number(),
        category: z.string(),
        brand: z.string(),
        stock: z.number(),
        images: z.string().array(),
    })

    // ?query=laptop&category=electronics&start=500&end=1500
    // สร้าง schema สำหรับการ validate query parameters
    private querySchema = z.object({
        query: z.string().optional(),
        category: z.string().optional(),
        start: z
            .string()
            .optional()
            .transform((val) => (val ? Number(val) : 0)), // start ต้องเป็น string ที่สามารถแปลงเป็น number หรือค่าเริ่มต้น 0
        end: z
            .string()
            .optional()
            .transform((val) => (val ? Number(val) : Infinity)), // end ต้องเป็น string ที่สามารถแปลงเป็น number หรือค่าเริ่มต้น Infinity
    })

    async productHandler(req: Request, res: Response) {
        try {
            const query = this.querySchema.parse(req.query)
            const products = await this.prodcutsUsecase.execute({
                ...query,
                range: { start: query.start, end: query.end },
            })
            res.json(products)
        } catch (err) {
            if (err instanceof HttpError) {
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
            const body = this.productSchema.parse(req.body)
            const product = new Products({
                ...body,
                shopId: new Types.ObjectId(),
            })
            await this.saveProductUsecase.execute(product)
            res.json({ message: 'OK' })
        } catch (err) {
            if (err instanceof HttpError) {
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
