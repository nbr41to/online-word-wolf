import { Layout } from 'src/components/Layout'
import { RecoilRoot, useRecoilValue } from 'recoil';
import { GlobalStyle } from 'src/styles/GlobalStyle'
import Head from 'next/head'
import { ThemeProvider } from 'styled-components'
import { theme1 } from 'src/styles/theme'
import { FireStoreToRecoil } from 'src/recoil/FireStoreToRecoil'
import { room, user } from 'src/recoil/atom';

function MyApp({ Component, pageProps }) {
  return (
    <RecoilRoot>
      <ThemeProvider theme={theme1}>
        <FireStoreToRecoil />
        <GlobalStyle />
        <Layout>
          <Head>
            <title>Online Word Wolf</title>
            <meta name="description" content="グループ通話をしながらワードウルフができるアプリ Online Word Wolf -オンラインワードウルフ-" />
          </Head>
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    </RecoilRoot>
  )
}

export default MyApp
