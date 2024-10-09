import { Router } from 'express'
import { UserRepository } from '../../infrastructure/repository/UserRepository'
import { Login } from '../../domain/usecase/login'
import { UserController } from '../controllers/UserController'
import { Signup } from '../../domain/usecase/signup'
import { Profile } from '../../domain/usecase/profile'
import { Update } from '../../domain/usecase/update'
import { JwtAuthGuard } from '../middleware/JwtAuthGuard'

const router = Router()

const userRepository = new UserRepository()
const loginUsecase = new Login(userRepository)
const signupUsecase = new Signup(userRepository)
const profileUsecase = new Profile(userRepository)
const updateUsecase = new Update(userRepository)
const userController = new UserController(
    loginUsecase,
    signupUsecase,
    profileUsecase,
    updateUsecase
)

router.post('/login', (req, res) => userController.loginHandler(req, res))
router.post('/signup', (req, res) => userController.signupHandler(req, res))

export default router
