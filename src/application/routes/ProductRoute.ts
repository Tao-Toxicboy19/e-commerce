import { Router } from 'express'
import { ProductRepository } from '../../infrastructure/repository/ProductRepository'
import { ProductsUsecase } from '../../domain/usecase/product/ProductsUsecase'
import { ProductController } from '../controllers/ProductController'
import { SaveProductUsecase } from '../../domain/usecase/product/SaveProductUsecase'

const router = Router()

const productsRepository = new ProductRepository()
const productsUsecase = new ProductsUsecase(productsRepository)
const saveProductUsecase = new SaveProductUsecase(productsRepository)
const productsController = new ProductController(
    productsUsecase,
    saveProductUsecase
)

router.get('/products', (req, res) =>
    productsController.productHandler(req, res)
)
router.post('/product', (req, res) =>
    productsController.saveProductHandler(req, res)
)

export default router
