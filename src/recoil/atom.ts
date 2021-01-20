import {atom} from'recoil'

export type User = {
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
  readonly roomId: string
  readonly inviteCode: string
  theme: string[]
  readonly host: string
  member: User[],
  table: {},
  isGaming: boolean,
  finished: boolean,
  votes: string[],
}

export const room = atom<Room>({
  key: 'room',
  default: {
    roomId: '',
    inviteCode: '850197',
    theme:[],
    host: '',
    member: [],
    table: {},
    isGaming: false,
    finished: false,
    votes: [],
  },
});
