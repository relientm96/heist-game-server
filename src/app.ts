import './register';

import cors from 'cors';
import express from 'express';

import { healthCheckHandler } from 'src/api/healthCheck';
import { createGame } from 'src/api/room/createRoom';
import { getRooms } from 'src/api/room/getRoom';
import { joinRoom } from 'src/api/room/joinRoom';
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
  .get('/room', getRooms)
  .post('/room', joinRoom)
  .post('/game', createGame);

export default Object.assign(app, {
  port: config.port,
});
