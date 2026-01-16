rfjs
===

This project is a `royfw/starter-turbo` template for creating a new project using the [start-ts-by](https://www.npmjs.com/package/start-ts-by) CLI.

## Reference

- [Original README](./START_BY_README.md)

## ORM Libraries Usage

This project includes wrappers for multiple ORM libraries. Below are examples of how to initialize migrations and seeding for each interaction, based on usage in `@apps/orm-app`.

### @libs/orm-drizzle

```typescript
import { migrateToLatest, seedToLatest } from '@rfjs/orm-drizzle';

// Migration
await migrateToLatest({
  connectionString: process.env.DATABASE_URL,
  schema: 'app_drizzle',
  migrationsFolder: 'node_modules/@rfjs/orm-drizzle/dist/drizzle',
});

// Seeding
await seedToLatest(process.env.DATABASE_URL, 'app_drizzle');
```

### @libs/orm-kysely

```typescript
import { migrateToLatest, seedToLatest } from '@rfjs/orm-kysely';

// Migration
await migrateToLatest({
  connectionString: process.env.DATABASE_URL,
  schema: 'app_kysely',
});

// Seeding
await seedToLatest(process.env.DATABASE_URL, 'app_kysely');
```

### @libs/orm-prisma

```typescript
import { migrateToLatest, seedToLatest } from '@rfjs/orm-prisma';

// Migration
await migrateToLatest({
  connectionString: process.env.DATABASE_URL,
  schemaFilePath: 'node_modules/@rfjs/orm-prisma/dist/prisma/schema.prisma',
  configFilePath: 'node_modules/@rfjs/orm-prisma/dist/prisma.config.ts',
  schema: 'app_prisma',
});

// Seeding
await seedToLatest(process.env.DATABASE_URL, 'app_prisma');
```

### @libs/orm-typeorm

```typescript
import { migrateToLatest, seedToLatest } from '@rfjs/orm-typeorm';

// Migration
await migrateToLatest({
  connectionString: process.env.DATABASE_URL,
  schema: 'app_typeorm',
});

// Seeding
await seedToLatest(process.env.DATABASE_URL, 'app_typeorm');
```

## Reference App (@apps/orm-app)

The `orm-app` demonstrates how to consume these libraries. You can run migrations for each ORM using the following scripts:

```bash
# Drizzle
npm run migrate:drizzle

# Kysely
npm run migrate:kysely

# Prisma
npm run migrate:prisma

# TypeORM
npm run migrate:typeorm
```
  