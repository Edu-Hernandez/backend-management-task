# backend-management-task

Backend NestJS con [Prisma ORM 8](https://www.prisma.io/docs) (release candidate) y PostgreSQL 15+.

El modelo de datos es un **contrato** PSL en [`prisma/schema.prisma`](prisma/schema.prisma). El CLI emite artefactos tipados y opera contra la base con `contract`, `db` y `migration`. Referencia generada por el init: [`prisma-8.md`](prisma-8.md).

## Setup

```bash
pnpm install
```

Copia [`.env.example`](.env.example) a `.env`. Variables usadas por Compose y la app:

```env
PORT=3005
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_DB=task_management
DATABASE_URL=postgresql://postgres:postgres@db:5432/task_management
```

`DATABASE_URL` con host `db` es para Docker Compose. En local (Postgres en el host) usa `localhost`.

## Docker

```bash
docker compose up --build
```

Levanta el backend en el puerto `3005` y Postgres 17. El Dockerfile emite el contrato con `pnpm prisma contract emit` (equivalente a `prisma generate` de versiones anteriores).

## Prisma ORM 8

Tras cambiar el schema:

```bash
pnpm prisma contract emit   # o: pnpm contract:emit
```

En este repo el emit escribe [`prisma/schema.json`](prisma/schema.json) y [`prisma/schema.d.ts`](prisma/schema.d.ts) (la guía habla de `contract.json` / `contract.d.ts`). Hay que versionarlos.

Consulta tipada:

```typescript
import { db } from './prisma/db';

const user = await db.orm.public.User
  .where({ email: 'alice@example.com' })
  .first();
```

### Comandos que usamos

```bash
# Contrato (offline)
pnpm prisma contract emit
pnpm prisma contract format
pnpm prisma contract infer          # PSL desde una base existente; luego emit + db sign

# Base viva (DATABASE_URL o --db <url>)
pnpm prisma db init                 # Primera vez: crea lo faltante (aditivo) y firma
pnpm prisma db update               # Aplica el gap schema ↔ contrato
pnpm prisma db migrate              # Aplica migraciones on-disk
pnpm prisma db verify
pnpm prisma db sign
pnpm prisma db schema

pnpm prisma db init --dry-run
pnpm prisma db update --dry-run
pnpm prisma db migrate --show

# Migraciones on-disk (plan escribe; db migrate aplica)
pnpm prisma migration plan --name <slug>
pnpm prisma migration status
pnpm prisma migration list
```

Flujo: editar `schema.prisma` → `contract emit` → `db init` (base vacía) o `migration plan` + `db migrate` / `db update`.

El resto de subcomandos (`migration graph`, `check`, `ref`, `skills`, re-init) está en [`prisma-8.md`](prisma-8.md) o en `pnpm prisma <cmd> --help`. No hace falta re-ejecutar `orm init`.

### Archivos

| Archivo | Propósito |
|---|---|
| [`prisma/schema.prisma`](prisma/schema.prisma) | Contrato PSL |
| [`prisma.config.ts`](prisma.config.ts) | Config del CLI |
| [`prisma/db.ts`](prisma/db.ts) | Cliente |
| [`prisma/schema.json`](prisma/schema.json) | Contrato compilado (generado) |
| [`prisma/schema.d.ts`](prisma/schema.d.ts) | Tipos (generado) |
| [`.env`](.env) / [`.env.example`](.env.example) | Connection string |

## App

```bash
pnpm start          # development
pnpm start:dev      # watch
pnpm start:prod     # production (`node dist/main`)
pnpm test
pnpm test:e2e
pnpm test:cov
```
