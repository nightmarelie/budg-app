# Budge APP or BA

# Process of creation

# Technologies

- [NestJS](https://docs.nestjs.com/)
- [NextJS](https://nextjs.org/)
- [Expo](https://docs.expo.dev/)

## Initialization

`pnpm i` - execute to install all dependencies

### Prerequisite

`brew install pnpm` - Installing pnpm to the system
`nvm alias default 16.18` - nvm set default node.js version 16.18
`nvm use`

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

[Monorepos](https://docs.expo.dev/guides/monorepos/) - docs
[PNPM](https://github.com/byCedric/expo-monorepo-benchmark) - examples

#### Mobile scripts:

`pnpm apps:mobile start` - run the mobile in the dev mode

## Git Conventional Commits. Init

`pnpm add -D -w @commitlint/{config-conventional,cli}` - Run this command from the root of the project.
`echo "module.exports = {extends: ['@commitlint/config-conventional']}" > commitlint.config.js` - Add config

To lint commits before they are created you can use Husky's commit-msg hook:
`pnpm add -D -w husky` - Install Husky v6
`pnpm husky install` -

### Docs

[Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/)
