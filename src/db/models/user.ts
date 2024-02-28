import { DataTypes, Model, Optional } from 'sequelize'
import { sequelize } from './index'
import { UserAttributes } from '../../types'

export interface UserCreation extends Optional<UserAttributes, 'id'> {}

interface UserInstance extends Model<UserAttributes, UserCreation>, UserAttributes {
  createdAt?: Date
  updatedAt?: Date
}

export const User = sequelize.define<UserInstance>('User', {
  id: {
    allowNull: false,
    primaryKey: true,
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    unique: true
  },
  username: {
    allowNull: false,
    unique: true,
    type: DataTypes.STRING
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  }
},
{
  tableName: 'user'
}
)
