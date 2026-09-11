# Repository Guidelines

## Project Structure & Module Organization

BelanjaYuk is a Bun workspace monorepo. The React 19/Vite frontend lives in `frontend/`: page-level routes are in `frontend/src/pages`, reusable UI is grouped by feature under `frontend/src/components`, catalog fixtures are in `frontend/src/data`, and static images belong in `frontend/public`. The NestJS API lives in `backend/`; application modules, controllers, and services are under `backend/src`, while end-to-end tests are in `backend/test`. The root `package.json`, `tsconfig.json`, and `bun.lock` coordinate both workspaces. Add shared libraries under `packages/` only when code is genuinely used by multiple workspaces.

## Build, Test, and Development Commands

- `bun install` installs all workspace dependencies from the repository root.
- `bun run dev` starts the frontend and backend together in watch mode.
- `bun run dev:frontend` or `bun run dev:backend` starts one service.
- `bun run build` builds every workspace; the frontend build also runs TypeScript checks.
- `bun run lint` runs Oxlint across both workspaces.
- `bun --filter @belanjayuk/backend test` runs backend unit tests once.
- `bun --filter @belanjayuk/backend test:e2e` runs API end-to-end tests.
- `bun --filter frontend preview` serves the production frontend build locally.

## Coding Style & Naming Conventions

Follow `.editorconfig`: UTF-8, LF endings, two-space indentation, final newlines, and no trailing whitespace. Match the style already used in the file you edit. Use PascalCase for React components and NestJS classes, camelCase for functions and variables, and descriptive kebab-free TypeScript filenames such as `ProductPage.tsx` or `app.service.ts`. Keep feature-specific components in their feature folder. Run `bun run lint` before submitting; backend formatting is available through `bun --filter @belanjayuk/backend format`.

## Testing Guidelines

Backend tests use Vitest, Nest testing utilities, and Supertest. Name unit tests `*.spec.ts` beside their source and end-to-end tests `*.e2e-spec.ts` in `backend/test`. Add tests for changed controller/service behavior and important HTTP status or response contracts. Use `bun --filter @belanjayuk/backend test:cov` when coverage evidence is useful. No frontend test runner is currently configured; at minimum, lint, build, and manually verify affected routes.

## Commit & Pull Request Guidelines

Recent history follows Conventional Commit prefixes, especially `feat:`; use focused messages such as `fix: handle missing product route`. Keep commits scoped to one coherent change. Pull requests should explain the change and validation performed, link relevant issues, identify configuration changes, and include screenshots for visible UI updates. Never commit secrets: copy `.env.example` to `.env` and keep local values untracked.
