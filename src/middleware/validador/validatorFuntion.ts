import { NextFunction, Request, Response } from 'express'
import { validationResult } from 'express-validator'
import { ClientError } from '../../utils'

export const validateResult = async (req: Request, _res: Response, next: NextFunction): Promise<void> => {
  const errors = validationResult(req)
  const verifyErros: boolean = errors.isEmpty()
  const arrayErrors = errors.mapped()
  try {
    if (!verifyErros) {
      const keys = Object.keys(errors.mapped())
      throw new ClientError(keys.map(key => `${key}: ${arrayErrors[key].msg as string}`).join(', '), 400)
    }
    next()
  } catch (error) {
    next(error)
  }
}
