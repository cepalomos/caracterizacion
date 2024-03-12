import * as jwt from 'jsonwebtoken'
import { JWT as secret } from '../config'
import { ClientError, ServerError } from '../utils'
import { Payload } from '../types'

const signToken = (payload: Payload): string => {
  if (payload.id !== undefined && payload.username !== undefined) {
    const token: string = jwt.sign(payload, secret, { expiresIn: '1h' })
    return token
  }
  throw new ServerError('Error en el payload de la funcion signToken', 500)
}
const verifyToken = (token: string): Payload => {
  try {
    const decoded = jwt.verify(token, secret) as Payload
    return decoded
  } catch (error) {
    throw new ClientError('Token inválido', 400)
  }
}

export { signToken, verifyToken }
