# Budge APP or BA

# Process of creation

## Initialization

### Prerequisite

`brew install pnpm` - Installing pnpm to the system
`nvm alias default 16.18` - nvm set default node.js version 16.18
`nvm use`

### Project init

`pnpm init` - To generate a top-level package.json

### Project structure

`mkdir apps packages` - Create an apps and packages. We will use app centric repositories

### Workspace maim file

`touch pnpm-workspace.yaml`

### Add nest cli

`pnpm add -D -w @nestjs/cli` - Run this command from the root of the project. I suppose that it will be our root helper. For example: I want to create microservices based on NestJS

### Add a server for now. We will split this app into small microservices...

`npx nest new server` - Create a new NestJS project

#### Server scripts:

`pnpm --filter server start:dev` or `pnpm apps:server start:dev` - run the server in the dev mode
