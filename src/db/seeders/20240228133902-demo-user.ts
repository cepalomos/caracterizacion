'use strict'
import { QueryInterface } from 'sequelize'
import { randomUUID } from 'node:crypto'
import { hash } from '../../utils'
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface: QueryInterface) => {
    const passHash = await hash('admin')
    const users = [{
      id: randomUUID(),
      username: 'admin',
      password: passHash,
      createdAt: new Date(),
      updatedAt: new Date()
    }]
    await queryInterface.bulkInsert('user', users, {})
  },

  down: async (queryInterface: QueryInterface) => {
    await queryInterface.bulkDelete('user', {})
  }
}
