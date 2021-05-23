type Theme = typeof theme1
declare module "styled-components" {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface DefaultTheme extends Theme {}
}

  React.useEffect(() => {
    let unSubscribe: () => void
    if (roomId !== '' && router.asPath.endsWith(roomId)) {
      // console.log('SubscribeRooms!!')
      unSubscribe = firebase.firestore().collection('rooms').doc(roomId).onSnapshot((doc) => {
        if (!doc) return router.push('/room')
        const roomDoc = doc.data() as Room
        setRoomInfo(roomDoc)
      })
    }
    return () => {
      if (roomId) {
        unSubscribe()
        firebase.firestore().collection('rooms').doc(roomId).delete()
        setRoomInfo({
          roomId: '',
          inviteCode: '',
          theme: [],
          member: {
            [userInfo.id]: {
              name: userInfo.name,
              icon: userInfo.icon,
              isHost: false,
              isReady: false,
              theme: '',
              votes: [],
              voted: false,
            }
          },
          isGaming: false,
          finished: false,
        })
      }
    }
  }, [])

  const getTheme = async () => {
    let themes: string[][] = []　配列の中に配列が入っている　型定義
    await firebase.firestore().collection('subjects').get().then(docs => {
      docs.forEach(doc => {
        const theme = doc.data().theme as string[]　配列の中に文字列型が入ってる方定義
        themes.push(theme)
      })
    })
    return themes[Math.floor(Math.random() * themes.length)]
  }