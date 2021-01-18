import { Layout } from 'src/components/Layout'
import { RecoilRoot } from 'recoil'
import { GlobalStyle } from 'src/styles/GlobalStyle'
import Head from 'next/head'

function MyApp({ Component, pageProps }) {
  return (
    <RecoilRoot>
      <GlobalStyle />
      <Layout>
        <Head>
          <title>Online Word Wolf</title>
          <meta name="description" content="グループ通話をしながらワードウルフができるアプリ Online Word Wolf -オンラインワードウルフ-" />
        </Head>
        <Component {...pageProps} />
      </Layout>
    </RecoilRoot>
  )
}

export default MyApp
