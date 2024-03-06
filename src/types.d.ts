import { Request } from 'express'

// Models
export interface UserAttributes {
  id: string
  username: string
  password: string
}

// User
export interface loginData {
  username: string
  password: string
}

export interface UserLogin extends Omit<UserAttributes, 'password'> {
  login: boolean
  token: string
}

export interface Payload extends Omit<UserAttributes, 'password'> {
}

export interface NucleoAttributes {
  id: string
  name: string
}

export interface AuthRequest extends Request {
  decoded: Payload
}

export interface UpdateUserAttributes extends UserAttributes {
  oldPassword: string
}
