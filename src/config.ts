import 'dotenv/config'
import swaggerJSDoc from 'swagger-jsdoc'

const JWT = process.env.SECRET ?? 'secreto'
const PORT_APP = process.env.PORT_APP ?? 3001
/**
 * Configuracion de swagger
 */
const swaggerOptions: swaggerJSDoc.Options = {
  definition: {
    openapi: '3.0.1',
    info: {
      title: 'App de Caracterizacion de poblacion',
      description: 'Documentación del Backend de la aplicación de Caracterizacion',
      version: '1.0'
    }
  },
  apis: ['./src/docs/*.yaml']
}

export {
  JWT,
  swaggerOptions,
  PORT_APP
}
