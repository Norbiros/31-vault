# 🌠 Zorya Nuxt starter

## 🛫 Requirements

- [Bun](https://bun.sh/) used only as a package manager

## 🏗️ Running

1. First, make sure all environment variables are configured properly.
   For basic development purposes you can just copy [`.env.example`](../.env.example) as `.env`

2. Install all packages

   ```shell
   bun install
   ```

3. Start development server

   ```shell
   # From our project root directory
   bun backend:dev
   ```

   ```shell
   # From frontend directory
   bun dev
   ```

## 🧪 Testing

### Simple tests

For simple tests you can use this command. It will use `@nuxt/test-utils` and `vitest` as test runner

```shell
# Run normal tests
bun run test
```

```shell
# Run tests with hot reloading
bun test:dev
```

### e2e

But for some more complex behavior we use [`playwright`](https://playwright.dev/) for e2e tests.
They should be placed in [`tests/e2e`](tests/e2e) directory.

> [!NOTE]
> Before running any e2e tests navigate to the frontend directory using command `cd frontend/`.

```shell
# Run playwright tests
bun e2e
```

It comes with a lot of awesome commands like

```shell
# Run tests in Playwright UI, with options to monitor console, screenshots, etc.
bun e2e:ui
```

```shell
# Generate tests based on interaction with website
bun e2e:codegen
```

## 🌸 Other commands

```shell
# Run linter and formatter
bun lint:fix
```

```shell
# Verify TypeScript definitions
bun typecheck
```
