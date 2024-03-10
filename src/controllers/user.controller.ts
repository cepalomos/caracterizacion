import { Request, Response, NextFunction } from 'express'
import { AuthRequest, UpdateUserAttributes, UserAttributes, loginData } from '../types'
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

export const createUser = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  const createData = (req as AuthRequest).body
  try {
    const userNew = await userService.createUser(createData)
    res.status(201).json(userNew)
  } catch (error) {
    next(error)
  }
}

export const putUser = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  try {
    const updateUser: UpdateUserAttributes = req.body
    const updateUserDB: UserAttributes = await userService.putUser(updateUser)
    res.status(200).json(updateUserDB)
  } catch (error) {
    next(error)
  }
}

export const deleteUser = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  const { id: idUser }: Pick<UserAttributes, 'id'> = req.params as Pick<UserAttributes, 'id'>
  console.log(idUser)
  try {
    const deleteUser = await userService.deleteUser(idUser)
    res.json({ message: deleteUser })
  } catch (error) {
    next(error)
  }
}
