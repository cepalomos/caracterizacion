import { body } from 'express-validator'
import { validateResult } from './validatorFuntion'
import { User } from '../../db/models/user'
import { ClientError } from '../../utils'

const uniqueUser = async (value: string): Promise<boolean> => {
  const uniqueUsername = await User.findOne({ where: { username: value } })
  if (uniqueUsername != null) {
    throw new ClientError(' El usuario que ingreso ya existe')
  }
  return true
}
export const createUser = [
  body(['username', 'password'])
    .notEmpty()
    .isString()
    .withMessage('No puede estar vacio y tiene que ser un string'),
  body('username')
    .custom(uniqueUser),
  validateResult]

export const putUser = [
  body('id')
    .notEmpty()
    .isString()
    .isUUID()
    .withMessage('No puede estar vacio y tiene que ser un string y tiene que ser UUID'),
  body(['username', 'password'])
    .notEmpty()
    .isString()
    .withMessage('No puede estar vacio y tiene que ser un string'),
  body('username')
    .custom(uniqueUser),
  validateResult
]
