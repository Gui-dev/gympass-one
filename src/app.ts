import fastifyJwt from '@fastify/jwt'
import Fastify from 'fastify'
import { ZodError } from 'zod'

import { checkInRoutes } from '@/http/controllers/check-ins/routes/check-in.route'
import { gymsRoutes } from '@/http/controllers/gyms/routes/gyms.route'
import { usersRoutes } from '@/http/controllers/users/routes/users.route'

import { env } from './validations/env'

export const app = Fastify()

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
})
app.register(usersRoutes)
app.register(gymsRoutes)
app.register(checkInRoutes)

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
