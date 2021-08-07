import { Handler } from 'express';

import { filterGameRoomJoinRequest } from 'src/entities/room';
import { hasRoom, removeRoom } from 'src/framework/storage';

export const joinRoom: Handler = (req, res) => {
  const safeRequest = filterGameRoomJoinRequest(req);
  const { pin } = safeRequest.body;

  const hasCurrentGame = hasRoom(pin);

  if (hasCurrentGame) {
    const roomWithPin = hasCurrentGame[0];
    const timeNow = Date.now();
    const isExpired = timeNow > roomWithPin.timeout;
    if (!isExpired) {
      res.send(`Successfully joined room ${roomWithPin.pin}`);
      return;
    }
    // Remove room because it has expired
    removeRoom(pin);
    res.send(`Room ${pin} has expired!`);
  }

  res.send(`Cannot find room with pin ${pin}`);
};
