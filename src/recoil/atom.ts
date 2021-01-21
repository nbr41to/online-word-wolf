import { atom } from 'recoil'

export type User = {
  id: any
  name: string
  icon: 'lion' | 'neko' 
}
export const user = atom<User>({
  key: 'user',
  default: {
    id: '',
    name: '',
    icon: 'lion',
  },
})

export type Member = {
    [id: string]: {
      name: string
      icon: 'lion' | 'neko'
      isHost: boolean
      isReady: boolean
      votes: number
      theme: string
      isWolf: boolean
      voted: boolean
    }
  }
export type Room = {
  readonly roomId: string
  readonly inviteCode: string
  theme: string[]
  member: Member | null
  isGaming: boolean
  finished: boolean
}

export const room = atom<Room>({
  key: 'room',
  default: {
    roomId: '',
    inviteCode: '',
    theme: ['サル', 'チンパンジー'],
    member: null,
    isGaming: false,
    finished: false,
  },
})
