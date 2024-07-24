import fastifyJwt from '@fastify/jwt'
import Fastify from 'fastify'
import { ZodError } from 'zod'

import { appRoutes } from './http/routes/routes'
import { env } from './validations/env'

export const app = Fastify()

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
})
app.register(appRoutes)

app.setErrorHandler((error, request, reply) => {
  if (error instanceof ZodError) {
    return reply.status(400).send({
      message: 'Validation error',
      issues: error.format(),
    })
  }

  if (env.NODE_ENV !== 'production') {
    console.error(error)
  } else {
    // TODO: we should logo to an external tool like - DataDog/NewRelic/Sentry
  }

  return reply.status(500).send({
    message: 'Internnal server error',
  })
})
