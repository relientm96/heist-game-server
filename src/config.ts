import { Env } from 'skuba-dive';

interface Config {
  environment: Environment;
  logLevel: string;
  name: string;
  port: number;
}

type Environment = typeof environments[number];

const environments = ['local', 'dev', 'prod'] as const;

const environment = Env.oneOf(environments)('ENVIRONMENT');

const PORT = 42341;
const SERVICE_NAME = 'heist-game-server';

/* istanbul ignore next: config verification makes more sense in a smoke test */
const configs: Record<Environment, () => Omit<Config, 'environment'>> = {
  local: () => ({
    logLevel: 'debug',
    name: SERVICE_NAME,
    port: PORT,
  }),

  dev: () => ({
    ...configs.prod(),
    logLevel: 'debug',
  }),

  prod: () => ({
    logLevel: 'info',
    name: SERVICE_NAME,
    port: PORT,
  }),
};

export const config: Config = {
  ...configs[environment](),
  environment,
};
