import Fastify from 'fastify'

import { appRoutes } from './http/routes/routes'

export const app = Fastify()

app.register(appRoutes)
