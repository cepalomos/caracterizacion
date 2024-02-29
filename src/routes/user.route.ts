import { Router } from 'express'
import { userController } from '../controllers'

const router = Router()

// eslint-disable-next-line @typescript-eslint/no-misused-promises
router.route('/login').post(userController.loginControllers)

export default router
