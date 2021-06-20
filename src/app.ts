import './register';

import cors from 'cors';
import express from 'express';

import { createGame, getRooms, joinRoom } from 'src/api/game';
import { healthCheckHandler } from 'src/api/healthCheck';
import { smokeTestHandler } from 'src/api/smokeTest';
import { config } from 'src/config';

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
