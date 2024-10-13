import { CartUsecase } from '../../domain/usecase/cart/cartUsecase'
import { IncreaseItemUsecase } from '../../domain/usecase/cart/increaseItemUsecase'
import { ReduceItemUsecase } from '../../domain/usecase/cart/reduceItemUsecase'
import { ErrorHandler } from '../error/ErrorHandler'
import { Request, Response } from 'express'
import { JwtPayload } from '../../types/JwtPayload'
import { cartDto } from '../validate/cart/cartDto'
import { DeleteProductOnCartUsecase } from '../../domain/usecase/cart/deleteProductOnCart'

export class CartController {
    constructor(
        private cartUsecase: CartUsecase,
        private increaseItemUsecase: IncreaseItemUsecase,
        private reduceItemUsecase: ReduceItemUsecase,
        private deleteProductOnCartUsecase: DeleteProductOnCartUsecase
    ) {}

    async cartHandler(req: Request, res: Response) {
        try {
            const { sub } = req.user as JwtPayload
            const carts = await this.cartUsecase.execute(sub)
            res.json(carts).status(200)
        } catch (error) {
            ErrorHandler.handleError(error, res)
        }
    }

    async increaseItemHandler(req: Request, res: Response) {
        try {
            const body = cartDto.parse(req.body)
            const { sub } = req.user as JwtPayload
            await this.increaseItemUsecase.execute(sub, body)
            res.json({ message: 'OK' }).status(200)
        } catch (error) {
            ErrorHandler.handleError(error, res)
        }
    }

    async reduceItemHandler(req: Request, res: Response) {
        try {
            const body = cartDto.parse(req.body)
            const { sub } = req.user as JwtPayload
            await this.reduceItemUsecase.execute(sub, body)
            res.json({ message: 'OK' }).status(200)
        } catch (error) {
            ErrorHandler.handleError(error, res)
        }
    }

    async deleteProductOnCartHandler(req: Request, res: Response) {
        try {
            const body = cartDto.parse(req.params)
            const { sub } = req.user as JwtPayload

            await this.deleteProductOnCartUsecase.execute(sub, body)

            res.json({ message: 'OK' }).status(200)
        } catch (error) {
            ErrorHandler.handleError(error, res)
        }
    }
}
