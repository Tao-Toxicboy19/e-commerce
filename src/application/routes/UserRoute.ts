import { Router } from 'express'
import { UserRepository } from '../../infrastructure/repository/UserRepository'
import { UserController } from '../controllers/UserController'
import { LoginUsecase } from '../../domain/usecase/user/LoginUsecase'
import { SignupUsecase } from '../../domain/usecase/user/SignupUsecase'
import { ProfileUsecase } from '../../domain/usecase/user/ProfileUsecase'
import { UpdateUsecase } from '../../domain/usecase/user/UpdateUsecase'
import { UseGuard } from '../middleware/UseGuard'

const router = Router()

const userRepository = new UserRepository()
const loginUsecase = new LoginUsecase(userRepository)
const signupUsecase = new SignupUsecase(userRepository)
const profileUsecase = new ProfileUsecase(userRepository)
const updateUsecase = new UpdateUsecase(userRepository)
const userController = new UserController(
    loginUsecase,
    signupUsecase,
    profileUsecase,
    updateUsecase
)

router.post('/login', (req, res) => userController.loginHandler(req, res))
router.post('/signup', (req, res) => userController.signupHandler(req, res))
router.get('/profile', UseGuard.jwtAuthGuard, (req, res) =>
    userController.profileHandler(req, res)
)

export default router
