/* eslint-disable new-cap */
import { Record, String } from 'runtypes';
import CheckFilter from 'runtypes-filter';

export interface GameRoom {
  pin: string;
  id: string;
  timeout: number;
}

const GameRoomJoinRequestSchema = Record({
  body: Record({
    pin: String,
  }),
});

export const filterGameRoomJoinRequest = CheckFilter(GameRoomJoinRequestSchema);
