import Image from 'next/image'
import React from 'react'
import { TopMenuButtons } from 'src/components/organisms/TopMenuButtons'
import firebase from 'src/firebase'

export default function Home() {
  const [themes, setThemes] = React.useState([])

  // React.useEffect(() => {
  //   firebase.auth().signInAnonymously().then(() => {
  //     firebase.firestore().collection("subjects").onSnapshot((snapshot) => {
  //       let getThemes = snapshot.docs.map((doc) => {
  //         const getTheme = doc.data()
  //         return getTheme
  //       })
  //       setThemes(getThemes)
  //     })
  //   })
  // }, [])

  return (
    <div>
      <div className='flex center'>
        <Image src='/arctic-wolf.jpg' width={1920 / 2} height={1280 / 2} />
      </div>
      <TopMenuButtons />
      <p>わーどうるふとは。わーどうるふとは。わーどうるふとは。わーどうるふとは。わーどうるふとは。わーどうるふとは。わーどうるふとは。わーどうるふとは。</p>
    </div>
  )
}
