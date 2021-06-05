import './register';

import cors from 'cors';
import express from 'express';

import { createGame, getRooms, joinRoom } from './api/game';
import { healthCheckHandler } from './api/healthCheck';
import { smokeTestHandler } from './api/smokeTest';
import { config } from './config';

const app = express()
  .use(cors())
  .use(express.json())
  .use(
    express.urlencoded({
      extended: true,
    }),
  )
  .get('/', (_, res) => {
    res.send('Hi!');
  })
  .get('/health', healthCheckHandler)
  .get('/smoke', smokeTestHandler)
  .post('/room', joinRoom)
  .get('/room', getRooms)
  .post('/game', createGame);

export default Object.assign(app, {
  port: config.port,
});
