# Arquitetura Clean

Estudo de arquitetura baseado neste [artigo](https://dev.to/bespoyasov/clean-architecture-on-frontend-4311) publicado por @bespoyasov.

## Uso

🐳 Com Docker:

- Clone este repositório;
- `docker-compose up`;
- Acesse `http://localhost:3000`.

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
- **State Management**: React Context API.
