# Estudos: JWT

Estudo baseado no tutorial [JWT Authentication Tutorial - Node.js](https://www.youtube.com/watch?v=mbsmsi7l3r4&ab_channel=WebDevSimplified), do canal [Web Dev Simplified](https://www.youtube.com/channel/UCFbNIlppjAuEX4znoulh0Cw).

## Stack

- Runtime Back-end: Node.js;
- Servidor: Nodemon.

## Como executar

```sh
$ npm install
$ npm run dev:server:start
$ npm run dev:auth:start
```

## Rotas

```
GET http://localhost:4000/login

Body:
{
  "username": "Foo"
}

Response:
{
  "accessToken": "...",
  "refreshToken": "..."
}

###

POST http://localhost:3000/posts
Authorization: "Bearer <accessToken>"

Response:
[...]

###

POST http://localhost:4000/token

Body:
{
  "token": "<refreshToken>"
}

Response:
{
  "accessToken": "..."
}

###

DELETE http://localhost:4000/logout

Body:
{
  "token": "<refreshToken>"
}
```
