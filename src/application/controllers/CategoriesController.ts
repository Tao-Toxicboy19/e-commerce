import { FindAllCategoriseUsecase } from '../../domain/usecase/categorise/findAllCategoriseUsecase'
import { ErrorHandler } from '../error/ErrorHandler'
import { Request, Response } from 'express'

export class CategoriesController {
    constructor(private findAllCategoriesUsecase: FindAllCategoriseUsecase) {}

    async findAllCategoriesHandler(req: Request, res: Response) {
        try {
            const categories = await this.findAllCategoriesUsecase.execute()
            res.status(200).json(categories)
        } catch (error) {
            ErrorHandler.handleError(error, res)
        }
    }
}
