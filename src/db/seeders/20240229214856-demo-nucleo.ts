'use strict'
import { QueryInterface } from 'sequelize'
import { randomUUID } from 'node:crypto'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface: QueryInterface) => {
    const users = [{
      id: randomUUID(),
      name: 'Persona',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      id: randomUUID(),
      name: 'Hogar',
      createdAt: new Date(),
      updatedAt: new Date()
    }]
    await queryInterface.bulkInsert('nucleo', users, {})
  },

  down: async (queryInterface: QueryInterface) => {
    await queryInterface.bulkDelete('nucleo', {})
  }
}
