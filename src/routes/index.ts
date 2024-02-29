import { Router } from 'express'
import userRoute from './user.route'
import { errorHandler } from '../utils'

const router = Router()
router.use('/users', userRoute)

router.use(errorHandler)

export default router
