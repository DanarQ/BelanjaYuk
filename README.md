# BelanjaYuk

Monorepo for the BelanjaYuk project, managed with **[Bun](https://bun.sh)** workspaces.

## Structure

```
BelanjaYuk/
├── backend/            # Backend service (@belanjayuk/backend)
├── frontend/           # Frontend service (@belanjayuk/frontend)
├── packages/           # Shared packages / libraries (optional)
├── .editorconfig       # Formatting consistency rules
├── .gitignore          # Git ignore configuration
├── package.json        # Root workspace configuration & scripts
├── tsconfig.json       # Base TypeScript configuration
└── README.md
```

## Getting Started

### Prerequisites

- [Bun](https://bun.sh) (v1.0+) installed on your machine.

### Installation

Install dependencies across all workspaces:

```bash
bun install
```

### Adding Dependencies

To add dependencies to a specific workspace, use `--filter`:

```bash
# Add to frontend
bun add <package-name> --filter @belanjayuk/frontend

# Add to backend
bun add <package-name> --filter @belanjayuk/backend

# Add dev dependency to root
bun add -d <package-name>
```

### Running Scripts

Run scripts across all workspaces or target specific ones:

```bash
# Run dev across all workspaces
bun run dev

# Run dev only on frontend
bun --filter @belanjayuk/frontend dev

# Run dev only on backend
bun --filter @belanjayuk/backend dev

# Build all workspaces
bun run build
```

