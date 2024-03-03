/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
import { userController } from '../controllers'
import * as Authorization from '../middleware'
import validate from '../middleware/validador'

const router = Router()

router.route('/login').post(userController.loginControllers)
router.route('/').post(Authorization.authorization, validate.createUser, userController.createUser)

export default router
