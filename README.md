# heist-game-server

[![Powered by skuba](https://img.shields.io/badge/🤿%20skuba-powered-009DC4)](https://github.com/seek-oss/skuba)

## Design

heist-game-server is a Node.js HTTP server built in line with our [technology strategy].
It uses the [Express] middleware framework and common SEEK packages.
Resource APIs enable synchronous interactions and serve as the backbone of SEEK's general service architecture.

This project is deployed as a containerised application with [Gantry].
A typical resource API instance does not require more than 1 vCPU,
so we eschew clustering configurations in favour of a single Node.js process per container.
Under load, we autoscale horizontally in terms of container count up to `autoScaling.maxCount`.

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
