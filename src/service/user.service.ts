import { User } from '../db/models/user'
import { UserLogin } from '../types'
import { ClientError, compareHash, signToken } from '../utils'

export const loginService = async (username: string, password: string): Promise<UserLogin | null> => {
  const user = await User.findOne({ where: { username }, attributes: { exclude: ['createdAt', 'updatedAt'] } })
  if (user == null) {
    throw new ClientError('Error en username o password', 400)
  }
  const login = await compareHash(password, user.password)
  if (login) {
    const { password, ...userClean } = user.dataValues
    const token = signToken(userClean)
    return { login, ...userClean, token }
  } else {
    return null
  }
}
