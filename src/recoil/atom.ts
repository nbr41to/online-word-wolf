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

export type Room = {
  roomId: string
  inviteCode: string
  host: string
  roomMember: string[],
  table: {},
  isGaming: boolean,
  finished: boolean,
  votes: string[],
}

export const room = atom<Room>({
  key: 'room',
  default: {
    roomId: '',
    inviteCode: '206696',
    host: '',
    roomMember: ["john","kevin"],
    table: {},
    isGaming: false,
    finished: false,
    votes: [],
  },
});
