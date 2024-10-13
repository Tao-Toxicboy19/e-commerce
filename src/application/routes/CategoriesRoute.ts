import { Router } from 'express'
import { CategoriesRepository } from '../../infrastructure/repository/CategoriesRepository'
import { FindAllCategoriseUsecase } from '../../domain/usecase/categorise/findAllCategoriseUsecase'
import { CategoriesController } from '../controllers/CategoriesController'

const router = Router()

const categoriesRepository = new CategoriesRepository()
const findAllCategoriesUsecase = new FindAllCategoriseUsecase(
    categoriesRepository
)
const categoriesController = new CategoriesController(findAllCategoriesUsecase)

router.get('/categories', (req, res) =>
    categoriesController.findAllCategoriesHandler(req, res)
)

export default router
