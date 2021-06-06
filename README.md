# heist-game-server

[![Powered by skuba](https://img.shields.io/badge/🤿%20skuba-powered-009DC4)](https://github.com/seek-oss/skuba)
![Deploy to Heroku](https://github.com/github/docs/actions/workflows/main.yml/badge.svg)

## Design

heist-game-server is a Node.js HTTP server built with the `Express` middleware framework.

This project is to be deployed as a containerised application with a typical resource API instance does not require more than 1 vCPU.

## Development

### Test

```shell
yarn test
```

### Lint

```shell
# fix
yarn format

# check
yarn lint
```

### Start

```shell
# Start a local HTTP server
yarn start
```
