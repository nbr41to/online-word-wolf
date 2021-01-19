import { Layout } from 'src/components/Layout'
import { RecoilRoot } from 'recoil'
import { GlobalStyle } from 'src/styles/GlobalStyle'
import Head from 'next/head'
import { ThemeProvider } from 'styled-components'
import { theme1 } from 'src/styles/theme'

function MyApp({ Component, pageProps }) {
  return (
    <RecoilRoot>
      <ThemeProvider theme={theme1}>
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
