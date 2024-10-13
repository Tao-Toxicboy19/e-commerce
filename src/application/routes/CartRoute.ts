import { Router } from 'express'
import { UseGuard } from '../middleware/UseGuard'
import { CartRepository } from '../../infrastructure/repository/CartRepository'
import { CartUsecase } from '../../domain/usecase/cart/cartUsecase'
import { IncreaseItemUsecase } from '../../domain/usecase/cart/increaseItemUsecase'
import { ReduceItemUsecase } from '../../domain/usecase/cart/reduceItemUsecase'
import { CartController } from '../controllers/CartController'
import { DeleteProductOnCartUsecase } from '../../domain/usecase/cart/deleteProductOnCart'

const router = Router()

const cartRepository = new CartRepository()
const cartUsecase = new CartUsecase(cartRepository)
const increaseItemUsecase = new IncreaseItemUsecase(cartRepository)
const reduceItemUsecase = new ReduceItemUsecase(cartRepository)
const deleteProductOnCartUsecase = new DeleteProductOnCartUsecase(
    cartRepository
)
const cartController = new CartController(
    cartUsecase,
    increaseItemUsecase,
    reduceItemUsecase,
    deleteProductOnCartUsecase
)

router.get('/carts', UseGuard.jwtAuthGuard, (req, res) =>
    cartController.cartHandler(req, res)
)
router.post('/cart/increase', UseGuard.jwtAuthGuard, (req, res) =>
    cartController.increaseItemHandler(req, res)
)
router.post('/cart/reduce', UseGuard.jwtAuthGuard, (req, res) =>
    cartController.reduceItemHandler(req, res)
)
router.delete('/cart/:id/items/:productId', UseGuard.jwtAuthGuard, (req, res) =>
    cartController.deleteProductOnCartHandler(req, res)
)

export default router
