import { DataTypes, Model, Optional } from 'sequelize'
import { NucleoAttributes } from '../../types'
import { sequelize } from './index'

export interface NucleoCreation extends Optional<NucleoAttributes, 'id'> {}

interface NucleoInstance extends Model<NucleoAttributes, NucleoCreation>, NucleoAttributes {
  createdAt?: Date
  updatedAt?: Date
}

export const Nucleo = sequelize.define<NucleoInstance>('Nucleo', {
  id: {
    allowNull: false,
    primaryKey: true,
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    unique: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  }
},
{
  tableName: 'user'
})
