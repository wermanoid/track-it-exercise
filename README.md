# Schibsted exercise

## Pre-requirements

Server is written using TypeScript + Express + Graphql + Apollo

Client-side technology stack is TypeScript + React + MobX + Apollo

Application itself should be started by NodeJS and Yarn:

| App/Lib    | Version    |
| ---------- | ---------- |
| NodeJs     | LTS (8.14) |
| Typescript | >= 3.4     |
| Yarn       | >= 1.12.0  |

## How to start

Simply clone this repository with `git clone` or other preferable way and follow next steps:

- install dependencies

```bash
yarn
```

- start the app

```bash
yarn start
```

- build production ready version

```bash
yarn build
```

- start the app in production mode

```bash
yarn start:prod
```

Wait until application starts (usually it takes around 5-10 seconds on first start) and it will be available on `http://localhost:9000`.

## Storybook

This repository contains `storybook` for developing/presenting components. To run it just hit

```bash
yarn storybook
```

Wait for it and it will be opened automatically in the new tab (in case of need it's available on `http://localhost:6006`)

## Testing

To test whole application just run

```bash
yarn test
```

It will run `jest`, `tslint` and `tsc` and print the results to the standard output.
