import { Request, Response, NextFunction } from 'express'
import { loginData } from '../types'
import { userService } from '../service'
import { ClientError } from '../utils'

export const loginControllers = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { username, password }: loginData = req.body
  try {
    const userLogin = await userService.loginService(username, password)
    if (userLogin == null || !userLogin.login) {
      throw new ClientError('No se encuentra el username o password', 400)
    } else {
      res.status(200).json(userLogin)
    }
  } catch (error) {
    next(error)
  }
}
