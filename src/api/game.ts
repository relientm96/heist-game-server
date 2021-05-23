/* eslint-disable new-cap */
import { Handler } from 'express';
import { Record, String } from 'runtypes';
import CheckFilter from 'runtypes-filter';
import { v4 as uuidv4 } from 'uuid';

const EXPIRY_TIME = 60000; // 1 minute expiry

const GameRoomJoinRequest = Record({
  body: Record({
    pin: String,
  }),
});

const filterGameRoomJoinRequest = CheckFilter(GameRoomJoinRequest);

interface GameRoom {
  pin: string;
  id: string;
  timeout: number;
}

let currentGames: GameRoom[] = [];

const addNewRoom = (newGameRoom: GameRoom) => {
  currentGames = [...currentGames, newGameRoom];
};

const removeRoom = (pin: string) => {
  currentGames = currentGames.filter((game) => game.pin !== pin);
};

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
  res.send(`Successfully created room. Here is your pincode: ${fourDigitCode}`);
};

export const joinRoom: Handler = (req, res) => {
  const safeRequest = filterGameRoomJoinRequest(req);
  const { pin } = safeRequest.body;
  const hasCurrentGame = currentGames.filter((game) => game.pin === pin);
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

export const getRooms: Handler = (_req, res) => res.send(currentGames);
