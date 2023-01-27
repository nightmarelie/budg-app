# Budge APP or BA (Monorepo)

# Process of creation

# Technologies

- [PNPM workspaces](https://pnpm.io/workspaces)
- [NestJS](https://docs.nestjs.com/)
- [NextJS](https://nextjs.org/)
- [Expo](https://docs.expo.dev/)

## Initialization

`pnpm i` or `pnpm i --force` - execute to install all dependencies

## Adding a new dependency to the Workspace

`pnpm add <package_to_add> --filter <workspace_name>`

## Workspaces

```
. root (@ba/monorepo)
├── apps
│   ├── client (@ba/client)
│   ├── mobile (@ba/mobile)
│   └── server (@ba/server)
```

### Project structure

`tree -I node_modules -L 2`

```
.
├── README.md
├── apps
│   ├── client
│   ├── mobile
│   └── server
├── commitlint.config.js
├── package.json
├── packages
├── pnpm-lock.yaml
└── pnpm-workspace.yaml
```

### Clear all dependencies & artifacts (build, cache, etc.)

`pnpm clear:all`

### Prerequisite

- `brew install pnpm` - Installing pnpm to the system
- `nvm alias default 16.18` - nvm set default node.js version 16.18
- `nvm use`

### Reference

- [Setup a Monorepo with PNPM](https://dev.to/nx/setup-a-monorepo-with-pnpm-workspaces-and-speed-it-up-with-nx-1eem)
- [PNPM Workspace](https://pnpm.io/workspaces)
- [Expo + PNPM](https://github.com/byCedric/expo-monorepo-benchmark/tree/main/pnpm-v7)

### Project init

`pnpm init` - To generate a top-level package.json

### Project structure

`mkdir apps packages` - Create an apps and packages. We will use app centric repositories

### Workspace maim file

`touch pnpm-workspace.yaml`

## Server. Init

`pnpm add -D -w @nestjs/cli` - Run this command from the root of the project. I suppose that it will be our root helper. For example: I want to create microservices based on NestJS

### Add a server for now. We will split this app into small microservices...

`npx nest new server` - Create a new NestJS project

#### Server scripts:

`pnpm apps:server start:dev` - run the server in the dev mode

## Client. Init

`pnpm create next-app --typescript` - Run this command from the root of the project.

## Mobile. Init

Visit [expo.dev](https://expo.dev/). To create an account.

`pnpm add -D -w eas-cli` - Add expo cli
`npx create-expo-app mobile` - Init the mobile app. Was executed in an apps directory
`eas init --id {{ID}}` - Connect expo to the server (expo.dev)

### PNPM + Expo

- [Monorepos](https://docs.expo.dev/guides/monorepos/) - docs
- [PNPM](https://github.com/byCedric/expo-monorepo-benchmark) - examples

#### Mobile scripts:

`pnpm apps:mobile start` - run the mobile in the dev mode

## Git Conventional Commits. Init

`pnpm add -D -w @commitlint/{config-conventional,cli}` - Run this command from the root of the project.
`echo "module.exports = {extends: ['@commitlint/config-conventional']}" > commitlint.config.js` - Add config

To lint commits before they are created you can use Husky's commit-msg hook:

- `pnpm add -D -w husky` - Install Husky v6
- `pnpm husky install` - Activate hooks
- `pnpm husky add .husky/commit-msg  'npx --no -- commitlint --edit ${1}'`

### Docs

[Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/)
