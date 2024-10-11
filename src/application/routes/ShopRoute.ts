import { Router } from 'express'
import { UseGuard } from '../middleware/UseGuard'
import { ShopRepository } from '../../infrastructure/repository/ShopRepository'
import { SaveShopUsecase } from '../../domain/usecase/shop/SaveShopUsecase'
import { ShopController } from '../controllers/ShopController'

const router = Router()

const shopRepository = new ShopRepository()
const saveShopUsecase = new SaveShopUsecase(shopRepository)
const shopController = new ShopController(saveShopUsecase)

router.post('/shop', UseGuard.jwtAuthGuard, (req, res) =>
    shopController.saveShopHandler(req, res)
)

export default router
