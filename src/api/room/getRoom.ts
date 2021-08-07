import { Handler } from 'express';

import { currentGames } from 'src/framework/storage';

export const getRooms: Handler = (_req, res) => res.send(currentGames);
