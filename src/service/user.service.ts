import { User, UserCreation } from '../db/models/user'
import { Payload, UpdateUserAttributes, UserAttributes, UserLogin } from '../types'
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

export const putUser = async (updateUser: UpdateUserAttributes): Promise<UserAttributes> => {
  const user = await User.findByPk(updateUser.id)
  if (user == null) {
    throw new ClientError('El usuario suministrado no existe', 400)
  }
  if (!(await compareHash(updateUser.oldPassword, user.password))) {
    throw new ClientError('El password viejo es incorrecto', 400)
  }
  const newPasswordHash = await hash(updateUser.password)
  await user.update({ username: updateUser.username, password: newPasswordHash })
  return { id: user.id, username: user.username, password: updateUser.password }
}

export const deleteUser = async (id: UserAttributes['id']): Promise<string> => {
  const deleteUser = await User.destroy({ where: { id } })
  if (deleteUser === 1) {
    return 'Se elimino el Usuario correctamente'
  } else {
    throw new ClientError('No existe el usuario', 400)
  }
}

export const getAllUsers = async (): Promise<Payload[]> => {
  const users = await User.findAll({ attributes: { exclude: ['password', 'updatedAt', 'createdAt'] } })
  return users
}
