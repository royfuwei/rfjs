rfjs
===

本專案是一個 `royfuwei/starter-turbo` 模板，用於使用 [start-ts-by](https://www.npmjs.com/package/start-ts-by) CLI 建立新專案。

## 快速開始

```bash
# 1. 安裝依賴
npm install
## 或 pnpm
pnpm install
# 2. 執行專案
npm run dev
# 3. 建置專案
npm run build
# 4. 執行測試
npm run test
# 5. 執行 lint
npm run lint
```

## 發布 (Release)

```bash
# 1. 發布專案
npx standard-version
## 或
npm run release
# 演練 (dry run)
npm run release -- --dry-run

# 2. 指定版本發布專案
npm run release -- --version 1.0.0
```

## 參考資料

- [原始 README](./START_BY_README.md)

## ORM 函式庫使用方式

本專案包含了多個 ORM 函式庫的封裝。以下是基於 `@apps/orm-app` 的使用方式，展示如何初始化遷移 (migrations) 和種子資料 (seeding) 的範例。

### @libs/orm-drizzle

```typescript
import { migrateToLatest, seedToLatest } from '@rfjs/orm-drizzle';

// 遷移 (Migration)
await migrateToLatest({
  connectionString: process.env.DATABASE_URL,
  schema: 'app_drizzle',
  migrationsFolder: 'node_modules/@rfjs/orm-drizzle/dist/drizzle',
});

// 種子資料 (Seeding)
await seedToLatest(process.env.DATABASE_URL, 'app_drizzle');
```

### @libs/orm-kysely

```typescript
import { migrateToLatest, seedToLatest } from '@rfjs/orm-kysely';

// 遷移 (Migration)
await migrateToLatest({
  connectionString: process.env.DATABASE_URL,
  schema: 'app_kysely',
});

// 種子資料 (Seeding)
await seedToLatest(process.env.DATABASE_URL, 'app_kysely');
```

### @libs/orm-prisma

```typescript
import { migrateToLatest, seedToLatest } from '@rfjs/orm-prisma';

// 遷移 (Migration)
await migrateToLatest({
  connectionString: process.env.DATABASE_URL,
  schemaFilePath: 'node_modules/@rfjs/orm-prisma/dist/prisma/schema.prisma',
  configFilePath: 'node_modules/@rfjs/orm-prisma/dist/prisma.config.ts',
  schema: 'app_prisma',
});

// 種子資料 (Seeding)
await seedToLatest(process.env.DATABASE_URL, 'app_prisma');
```

### @libs/orm-typeorm

```typescript
import { migrateToLatest, seedToLatest } from '@rfjs/orm-typeorm';

// 遷移 (Migration)
await migrateToLatest({
  connectionString: process.env.DATABASE_URL,
  schema: 'app_typeorm',
});

// 種子資料 (Seeding)
await seedToLatest(process.env.DATABASE_URL, 'app_typeorm');
```

## 參考應用程式 (@apps/orm-app)

`orm-app` 展示了如何使用這些函式庫。您可以使用以下指令來執行各個 ORM 的遷移：

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
