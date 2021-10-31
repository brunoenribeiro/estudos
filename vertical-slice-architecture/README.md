# Arquitetura Vertical Slice

Estudo de arquitetura baseado na proposta do [Apollo Server](https://www.apollographql.com/blog/apollo-client/architecture/client-side-architecture-basics/).

## Uso

🐳 Com Docker:

- Clone este repositório;
- `docker-compose up`.

Sem Docker:

- Clone o [servidor de testes](https://github.com/brunoenribeiro/estudos/tree/main/todo-server);
- Clone este repositório;
- `yarn install` em ambos repositórios;
- `yarn start` em ambos repositórios;
- Acesse `http://localhost:3000`.

## Stack

- **Linguagem**: TypeScript;
- **Framework JS**: React;
- **Tooling**: React Scripts;
- **Bundling**: Webpack (config padrão do CRA);
- **API Client**: Apollo Client + GraphQL;
- **State Management**: Apollo Client (cache).
