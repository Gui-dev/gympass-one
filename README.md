![Cover](./.screens/cover.png)

# Gympass API

A aplicação GymPass tem como objetivo gerenciar o tráfego de clientes em academias. Os usuários podem realizar o check-in nas academias, porém o check-in só é permitido se o usuário estiver a uma distância de até 100 metros da academia.

## ✨ Technologies used

- [Node.js](https://nodejs.org/)
- [Typescript](https://www.typescriptlang.org/)
- [Fastify](https://fastify.dev/)
- [Jest](https://jestjs.io/)
- [Supertest](https://github.com/ladjs/supertest)
- [Docker](https://docs.docker.com/)
- [Github Actions](https://docs.github.com/pt/actions)
- [Zod](https://zod.dev/)

## HTTP

### Users

### POST `/users`

Create a new user.

#### Request body

```json
{
  "name": "Bruce Wayne",
  "email": "bruce@email.com",
  "password": "123456"
}
```

#### Response body

```json
{
  "statusCode": 201
}
```

### POST `/sessions`

Create a new session.

#### Request body

```json
{
  "email": "bruce@email.com",
  "password": "123456"
}
```

#### Response body

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiQURNSU4iLCJzdWIiOiJjbHoyYXpxaDEwMDAwMTN3enJibWZuZ21vIiwiaWF0IjoxNzIyNDA2MjEwLCJleHAiOjE3MjI0MDY4MTB9.syeNtQOZW378XAlYarhsLzCZVE5Xl3A4RTHOdu3ukCo"
}
```

### GET `/me`

Get user profile.

#### Request body

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiQURNSU4iLCJzdWIiOiJjbHoyYXpxaDEwMDAwMTN3enJibWZuZ21vIiwiaWF0IjoxNzIyNDA2MjEwLCJleHAiOjE3MjI0MDY4MTB9.syeNtQOZW378XAlYarhsLzCZVE5Xl3A4RTHOdu3ukCo"
}
```

#### Response body

```json
{
  "user": {
    "id": "clz2azqh1000013wzrbmfngmo",
    "name": "Bruce Wayne",
    "email": "bruce@email.com",
    "role": "ADMIN",
    "created_at": "2024-07-26T06:10:23.558Z"
  }
}
```

### PATCH `/token/refresh`

Refresh token.

#### Request body

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiQURNSU4iLCJzdWIiOiJjbHoyYXpxaDEwMDAwMTN3enJibWZuZ21vIiwiaWF0IjoxNzIyNDA2MjEwLCJleHAiOjE3MjI0MDY4MTB9.syeNtQOZW378XAlYarhsLzCZVE5Xl3A4RTHOdu3ukCo"
}
```

#### Response body

```json
{
  "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiQURNSU4iLCJzdWIiOiJjbHoyYXpxaDEwMDAwMTN3enJibWZuZ21vIiwiaWF0IjoxNzIyNDA2MjEwLCJleHAiOjE3MjI0MDY4MTB9.syeNtQOZW378XAlYarhsLzCZVE5Xl3A4RTHOdu3ukCo"
}
```

### Gyms

### POST `/gyms`

Create a new gym.

#### Request body

```json
{
  "title": "Litle chiken gym",
  "description": "My description",
  "phone": "11998765431",
  "latitude": -23.7833232,
  "longitude": -46.6801928
}
```

#### Response body

```json
{
  "statusCode": 201
}
```

### GET `/gyms/nearby`

Get nearby gyms

#### Request body

```json
  "query": "/gyms/nearby?query=latitude=-23.7833232&longitude=-46.6801928"
```

#### Response body

```json
  "gyms": [
    {
      "title": "Litle chiken gym",
      "description": "My description",
      "phone": "11998765431",
      "latitude": -23.7833232,
      "longitude": -46.6801928
    }
  ]
```

### GET `/gyms/search`

Get search gyms

#### Request body

```json
  "query": "/gyms/nearby?query=title=Litle chiken gym"
```

#### Response body

```json
  "gyms": [
    {
      "title": "Litle chiken gym",
      "description": "My description",
      "phone": "11998765431",
      "latitude": -23.7833232,
      "longitude": -46.6801928
    }
  ]
```

### Check ins

### POST `/gyms/:gym_id/check-ins`

Create a new check-in

#### Request body

```json
  "latitude": -23.7833232,
  "longitude": -46.6801928
```

#### Response body

```json
{
  "id": "ad7c8270-bc9a-4d00-b5d0-3a29eded84b9",
  "user_id": "user_fake_id",
  "gym_id": "fake_gym_id",
  "validated_at": null,
  "created_at": "2024-07-31T06:32:56.847Z"
}
```

### GET `/check-ins/history`

Get check in history

#### Request body

```json
  "user_id": "user_fake_id",
  "gym_id": "fake_gym_id",
```

#### Response body

```json
 "check_ins": [
    {
      "id": "ad7c8270-bc9a-4d00-b5d0-3a29eded84b9",
      "user_id": "user_fake_id",
      "gym_id": "fake_gym_id",
      "validated_at": null,
      "created_at": "2024-07-31T06:32:56.847Z"
    }
 ]
```

### GET `/check-ins/metrics`

Get check in metrics

#### Request body

```json
  "user_id": "user_fake_id",
```

#### Response body

```json
 "check_ins_count": 1
```

### PATCH `/check-ins/:check_in_id/validate`

Get check in validate

#### Response body

```json
 "statusCode": 204
```

## Setup

- Clone the repository;
- Setup PostgreSQL (`docker compose up -d`);
- Copy `.env.example` file (`cp .env.example .env`);
- Run application (`pnpm dev`);

## Install dependencies

```bash
npm ci
pnpm install --frozen-lockfile
```

## .env file

```bash
cp .env.example .env
```

## Prisma Migrate

```bash
npx prisma migrate dev
pnpm dlx prisma migrate dev
```

## Prisma Studio

```bash
npx prisma studio
pnpm dlx prisma studio
```

## Run Docker Compose

```bash
docker compose up -d
```

## Run app

```bash
npm run dev
pnpm dev
```

## Licença

Este projeto está licenciado sob a licença MIT.
