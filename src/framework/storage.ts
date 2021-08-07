import { GameRoom } from 'src/entities/room';

export let currentGames: GameRoom[] = [];

export const addNewRoom = (newGameRoom: GameRoom) => {
  currentGames.concat([newGameRoom]);
};

export const removeRoom = (pin: string) => {
  currentGames = currentGames.filter((game) => game.pin !== pin);
};

export const hasRoom = (pin: string) =>
  currentGames.filter((game) => game.pin === pin);
