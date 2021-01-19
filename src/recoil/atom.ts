import {atom} from'recoil'

type User = {
  name: string
  icon: 'lion' | 'neko'
}
export const user = atom<User>({
  key: 'user',
  default: {
    name: 'ななしたけし',
    icon: 'lion',
  },
});

type Room = {
  roomId: string
  inviteCode: string
  host: string
  players: string[],
  table: {},
  isGaming: boolean,
  finished: boolean,
  votes: string[],
}
export const room = atom({
  key: 'room',
  default: {
    roomId: '',
    inviteCode: '',
    host: '',
    players: [],
    table: {},
    isGaming: false,
    finished: false,
    votes: [],
  },
});
