import { User, UserCreation } from '../db/models/user'
import { UserAttributes, UserLogin } from '../types'
import { ClientError, compareHash, hash, signToken } from '../utils'

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

export const createUser = async (createData: UserCreation): Promise<UserAttributes> => {
  const passwordHash = await hash(createData.password)
  const { id, username } = (await User.create({ username: createData.username, password: passwordHash })).dataValues
  return { id, username, password: createData.password }
}
