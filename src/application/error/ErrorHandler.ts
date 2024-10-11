import { Response } from 'express'
import { ZodError } from 'zod'
import { HttpError } from '../../infrastructure/errors/HttpError'

export class ErrorHandler {
    static handleError(err: any, res: Response): void {
        if (err instanceof ZodError) {
            res.status(400).send({
                message: err.errors,
                statusCode: 400,
            })
        } else if (err instanceof HttpError) {
            res.status(err.statusCode).send({
                message: err.message,
                statusCode: err.statusCode,
            })
        } else {
            res.status(500).send({
                message: err.message || 'Internal Server Error',
                statusCode: 500,
            })
        }
    }
}
