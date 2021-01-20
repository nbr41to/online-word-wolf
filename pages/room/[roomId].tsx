import { Member } from "src/components/templates/Member"
import { OnGame } from '../../src/components/displays/OnGame'
import { InviteCode } from '../../src/components/templates/InviteCode'
import { SubscribeRooms } from '../../src/recoil/SubscribeRooms'

const PlayingRoom = () => {
  return (
    <div>
      <SubscribeRooms />
      <InviteCode />
      <Member />
      <OnGame />
    </div>
  )
}

export default PlayingRoom
