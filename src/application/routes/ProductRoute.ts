import { Router } from 'express'
import { ProductRepository } from '../../infrastructure/repository/ProductRepository'
import { ProductsUsecase } from '../../domain/usecase/product/ProductsUsecase'
import { ProductController } from '../controllers/ProductController'
import { SaveProductUsecase } from '../../domain/usecase/product/SaveProductUsecase'
import { UseGuard } from '../middleware/UseGuard'
import { UploadImageGuard } from '../middleware/UploadImageGuard'
import { UploadImagesUsecase } from '../../domain/usecase/uploadImage/UploadImagesUsecase'
import { UpdateProductUsecase } from '../../domain/usecase/product/UpdateProductUsecase'

const router = Router()

const uploadImageGuard = new UploadImageGuard()
const uploadImageUsecase = new UploadImagesUsecase()

const productsRepository = new ProductRepository()
const productsUsecase = new ProductsUsecase(productsRepository)
const saveProductUsecase = new SaveProductUsecase(
    productsRepository,
    uploadImageUsecase
)
const updateProductUsecase = new UpdateProductUsecase(productsRepository)
const productsController = new ProductController(
    productsUsecase,
    saveProductUsecase,
    updateProductUsecase
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
router.patch(
    '/product',
    UseGuard.jwtAuthGuard,
    UseGuard.shopRoleGuard,
    uploadImageGuard.getUploader().array('images'),
    (req, res) => productsController.updateProductHandler(req, res)
)

export default router
