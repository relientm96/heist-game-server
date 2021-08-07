import { Handler } from 'express';
import { v4 as uuidv4 } from 'uuid';

import { addNewRoom } from 'src/framework/storage';

const EXPIRY_TIME = 60000; // 1 minute expiry

export const createGame: Handler = (_req, res) => {
  const gameIDCreated = uuidv4();
  const expiryTimeout = Date.now() + EXPIRY_TIME;
  const fourDigitCode = gameIDCreated.substring(0, 4);
  const createdGameRoom = {
    pin: fourDigitCode,
    id: gameIDCreated,
    timeout: expiryTimeout,
  };
  addNewRoom(createdGameRoom);
  res.send({
    pinCode: fourDigitCode,
  });
};
