import { describe, test } from '@jest/globals'
import * as jwt from '../../utils/jwt'
import { Payload } from '../../types'

describe('Testeo de jwt', () => {
  describe('Testeo de funcion signToken', () => {
    test('Se pasa un payload correcto', () => {
      const token = jwt.signToken({ id: '16763be4-6022-406e-a950-fcd5018633ca', username: 'admin' })
      expect(token).not.toBeFalsy()
    })
    test('Se pasa un payload incorrecto', () => {
      const invalidPayload = { someInvalidProperty: 'invalidValue' } as unknown as Payload // Missing required properties
      expect(() => jwt.signToken(invalidPayload)).toThrow()
    })
  })
  describe('Testeo de funcion verifyToken', () => {
    const user = { id: '16763be4-6022-406e-a950-fcd5018633ca', username: 'admin' }
    const badToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'
    let token: string
    beforeAll(() => {
      token = jwt.signToken(user)
    })
    test('Se pasa un token valido', () => {
      const decoded = jwt.verifyToken(token)
      expect(decoded.id).toBe(user.id)
      expect(decoded.username).toBe(user.username)
    })
    test('Se pasa un token invalido', () => {
      expect(() => jwt.verifyToken(badToken)).toThrow()
    })
  })
})
