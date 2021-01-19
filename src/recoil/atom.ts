import {atom} from'recoil'

type UserInfo = {
  name: string
  icon: 'lion' | 'neko'
}
export const userInfo = atom<UserInfo>({
  key: 'userInfo',
  default: {
    name: 'ななしたけし',
    icon: 'lion',
  },
});

export const roomInfo = atom({
  key: 'roomInfo',
  default: {
    roomId: '',
    room_key: '',
  },
});
