import { FastifyReply, FastifyRequest } from 'fastify'

export const refresh = async (request: FastifyRequest, reply: FastifyReply) => {
  await request.jwtVerify({ onlyCookie: true })
  const { role } = request.user

  const token = await reply.jwtSign(
    {
      role,
    },
    {
      sign: {
        sub: request.user.sub,
      },
    },
  )
  const refresh_token = await reply.jwtSign(
    {
      role,
    },
    {
      sign: {
        sub: request.user.sub,
        expiresIn: '7d',
      },
    },
  )

  return reply
    .setCookie('refresh_token', refresh_token, {
      path: '/',
      secure: true, // HTTPS
      sameSite: true,
      httpOnly: true,
    })
    .status(200)
    .send({ token })
}
