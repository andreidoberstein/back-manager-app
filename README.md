```plaintext
/backend-gestao-empresarial
├── /src
│   ├── /auth
│   │   ├── auth.module.ts
│   │   ├── auth.service.ts
│   │   ├── auth.controller.ts
│   │   ├── jwt.strategy.ts
│   │   ├── jwt-auth.guard.ts
│   │   ├── dto
│   │   │   ├── login.dto.ts
│   │   │   ├── register.dto.ts
│   │   ├── interfaces
│   │   │   ├── jwt-payload.interface.ts
│   ├── /crm
│   │   ├── crm.module.ts
│   │   ├── crm.service.ts
│   │   ├── crm.controller.ts
│   │   ├── crm.repository.ts
│   │   ├── dto
│   │   │   ├── create-customer.dto.ts
│   │   │   ├── update-customer.dto.ts
│   │   ├── entities
│   │   │   ├── customer.entity.ts
│   ├── /financial
│   │   ├── financial.module.ts
│   │   ├── financial.service.ts
│   │   ├── financial.controller.ts
│   │   ├── financial.repository.ts
│   │   ├── dto
│   │   │   ├── create-transaction.dto.ts
│   │   │   ├── update-transaction.dto.ts
│   │   ├── entities
│   │   │   ├── transaction.entity.ts
│   ├── /reports
│   │   ├── reports.module.ts
│   │   ├── reports.service.ts
│   │   ├── reports.controller.ts
│   │   ├── reports.repository.ts
│   │   ├── dto
│   │   │   ├── generate-report.dto.ts
│   │   ├── entities
│   │   │   ├── report.entity.ts
│   ├── /graphql
│   │   ├── schemas
│   │   │   ├── customer.schema.ts
│   │   │   ├── transaction.schema.ts
│   │   │   ├── report.schema.ts
│   │   ├── resolvers
│   │   │   ├── customer.resolver.ts
│   │   │   ├── transaction.resolver.ts
│   │   │   ├── report.resolver.ts
│   ├── /config
│   │   ├── prisma.service.ts
│   │   ├── redis.service.ts
│   ├── /common
│   │   ├── decorators
│   │   │   ├── roles.decorator.ts
│   │   ├── guards
│   │   │   ├── roles.guard.ts
│   ├── app.module.ts
│   ├── main.ts
├── /prisma
│   ├── schema.prisma
├── /test
│   ├── auth
│   │   ├── auth.controller.spec.ts
│   │   ├── auth.service.spec.ts
│   ├── crm
│   │   ├── crm.controller.spec.ts
│   │   ├── crm.service.spec.ts
│   ├── financial
│   │   ├── financial.controller.spec.ts
│   │   ├── financial.service.spec.ts
│   ├── reports
│   │   ├── reports.controller.spec.ts
│   │   ├── reports.service.spec.ts
│   ├── app.e2e-spec.ts
├── Dockerfile
├── docker-compose.yml
├── .env.example
├── package.json
├── tsconfig.json
├── README.md
```

### README.md
<xaiArtifact artifact_id="ed0f63be-c1ad-43d2-8761-f665aaa7649f" artifact_version_id="f0d2aac1-4511-4397-9fb4-bdb748aded59" title="README.md" contentType="text/markdown">

# Sistema de Gestão Empresarial

Uma plataforma completa para gestão empresarial com módulos de CRM, financeiro e relatórios avançados, construída com NestJS, Next.js, PostgreSQL, GraphQL, Redis e autenticação JWT. Inclui documentação com Swagger e testes unitários/integração.

## Tecnologias Utilizadas
- **NestJS**: Framework Node.js para backend escalável.
- **Prisma**: ORM para interação com PostgreSQL.
- **GraphQL**: API para consultas flexíveis.
- **Redis**: Cache para relatórios e sessões.
- **JWT**: Autenticação baseada em tokens.
- **Swagger**: Documentação da API REST.
- **PostgreSQL**: Banco de dados relacional.
- **Docker**: Containerização da aplicação.
- **Jest**: Framework para testes unitários e de integração.

## Pré-requisitos
- Docker e Docker Compose
- Node.js v18 ou superior
- Yarn ou npm
- Git

## Configuração do Ambiente

1. **Clone o Repositório**
   ```bash
   git clone https://github.com/seu-usuario/sistema-gestao-empresarial.git
   cd sistema-gestao-empresarial
   ```

2. **Configure as Variáveis de Ambiente**
   - Copie o arquivo `.env.example` para `.env`:
     ```bash
     cp .env.example .env
     ```
   - Edite o arquivo `.env` com suas credenciais:
     ```env
     DATABASE_URL="postgresql://user:password@localhost:5432/gestao?schema=public"
     JWT_SECRET="sua-chave-secreta"
     REDIS_HOST=redis
     REDIS_PORT=6379
     ```

3. **Suba os Containers com Docker**
   ```bash
   docker-compose up -d
   ```

4. **Instale as Dependências**
   ```bash
   npm install
   ```

5. **Execute as Migrações do Prisma**
   ```bash
   npm prisma migrate dev
   ```

6. **Inicie a Aplicação**
   ```bash
   npm run start:dev
   ```

## Endpoints Disponíveis
- **API REST**: `http://localhost:3000/api` (Swagger)
- **GraphQL**: `http://localhost:3000/graphql` (Playground)
- **Autenticação**:
  - `POST /auth/register` - Registrar usuário
  - `POST /auth/login` - Login e obtenção de token JWT
- **CRM**:
  - `GET /crm/customers` - Listar clientes
  - `POST /crm/customers` - Criar cliente
- **Financeiro**:
  - `GET /financial/transactions` - Listar transações
  - `POST /financial/transactions` - Criar transação
- **Relatórios**:
  - `POST /reports/generate` - Gerar relatório

## Executando Testes
- **Testes Unitários**:
  ```bash
  npm test
  ```
- **Testes de Integração**:
  ```bash
  npm test:e2e
  ```

## Documentação
- Acesse a documentação Swagger em `http://localhost:3000/api`.
- Explore a API GraphQL em `http://localhost:3000/graphql`.

## Estrutura do Projeto
- **/src/auth**: Módulo de autenticação com JWT.
- **/src/crm**: Módulo de gestão de clientes.
- **/src/financial**: Módulo de gestão financeira.
- **/src/reports**: Módulo de relatórios avançados.
- **/src/graphql**: Schemas e resolvers para GraphQL.
- **/prisma**: Configuração do Prisma e schema do banco.
- **/test**: Testes unitários e de integração.

