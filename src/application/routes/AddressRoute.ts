import { Router } from 'express'
import { JwtAuthGuard } from '../middleware/JwtAuthGuard'
import { AddressRepository } from '../../infrastructure/repository/AddressRepository'
import { AddressController } from '../controllers/AddressController'
import { AddressUsecase } from '../../domain/usecase/address/AddressUsecase'

const router = Router()

const addressRepository = new AddressRepository()
const addressUsecase = new AddressUsecase(addressRepository)
const addressController = new AddressController(addressUsecase)

router.post('/address', JwtAuthGuard, (req, res) =>
    addressController.addressHandler(req, res)
)

export default router