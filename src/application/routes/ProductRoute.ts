import { Router } from 'express'
import { ProductRepository } from '../../infrastructure/repository/ProductRepository'
import { ProductsUsecase } from '../../domain/usecase/product/ProductsUsecase'
import { ProductController } from '../controllers/ProductController'
import { SaveProductUsecase } from '../../domain/usecase/product/SaveProductUsecase'
import { UseGuard } from '../middleware/UseGuard'
import { UploadImageGuard } from '../middleware/UploadImageGuard'
import { UploadImagesUsecase } from '../../domain/usecase/uploadImage/UploadImagesUsecase'

const router = Router()

const uploadImageGuard = new UploadImageGuard()
const uploadImageUsecase = new UploadImagesUsecase()

const productsRepository = new ProductRepository()
const productsUsecase = new ProductsUsecase(productsRepository)
const saveProductUsecase = new SaveProductUsecase(
    productsRepository,
    uploadImageUsecase
)
const productsController = new ProductController(
    productsUsecase,
    saveProductUsecase
)

router.get('/products', (req, res) =>
    productsController.productHandler(req, res)
)
router.post(
    '/product',
    UseGuard.jwtAuthGuard,
    UseGuard.shopRoleGuard,
    uploadImageGuard.getUploader().array('images'),
    (req, res) => productsController.saveProductHandler(req, res)
)

export default router
