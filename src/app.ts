import express from 'express'
import router from './routes'
import swaggerJSDoc from 'swagger-jsdoc'
import { PORT_APP, swaggerOptions } from './config'
import { serve, setup } from 'swagger-ui-express'

const app = express()

app.set('port', PORT_APP)
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.get('/', (_, res) => res.redirect('/api/docs'))
const specs = swaggerJSDoc(swaggerOptions)
app.use('/api/docs', serve, setup(specs))
app.use('/api', router)

export default app
