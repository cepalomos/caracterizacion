import { NextFunction, Request, Response } from 'express'
import { ClientError, verifyToken } from '../utils'
import { AuthRequest, Payload } from '../types'

export const authorization = (req: Request, _res: Response, next: NextFunction): void => {
  const beared = req.headers.authorization?.split(' ')

  let token
  if (beared == null || beared.length === 0) {
    throw new ClientError('No autorizado', 401)
  } else {
    token = beared[1]
  }
  try {
    if (token === null || token === undefined) {
      throw new ClientError('No autorizado', 401)
    } else {
      const decoded: Payload = verifyToken(token);
      (req as AuthRequest).decoded = decoded
      next()
    }
  } catch (error) {
    next(error)
  }
}
