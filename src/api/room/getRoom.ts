import { Handler } from 'express';

import { getCurrentRooms } from 'src/framework/storage';

export const getRooms: Handler = (_req, res) => {
  res.send(getCurrentRooms());
};
