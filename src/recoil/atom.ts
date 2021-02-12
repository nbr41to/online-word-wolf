import { atom } from 'recoil';

export type Icon =
  | 'buta'
  | 'inu'
  | 'kuma'
  | 'lion'
  | 'neko'
  | 'panda'
  | 'penguin'
  | 'tora'
  | 'uma'
  | 'usagi'
  | 'zou';

export type User = {
  id: any;
  name: string;
  icon: Icon;
};
export const user = atom<User>({
  key: 'user_state',
  default: {
    id: '',
    name: '',
    icon: 'lion',
  },
});

export type Member = {
  [id: string]: {
    name: string;
    icon: Icon;
    isHost: boolean;
    isReady: boolean;
    theme: string;
    votes: string[];
    voted: boolean;
  };
};
export type Room = {
  readonly roomId: string;
  readonly inviteCode: string;
  theme: string[];
  member: Member | null;
  isGaming: boolean;
  finished: boolean;
};

export const room = atom<Room>({
  key: 'room_state',
  default: {
    roomId: '',
    inviteCode: '',
    theme: ['サル', 'チンパンジー'],
    member: {},
    isGaming: false,
    finished: false,
  },
});
