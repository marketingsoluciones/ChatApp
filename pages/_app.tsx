import '../styles/globals.css'
import "@fontsource/poppins"
import type { AppProps } from 'next/app'
import DefaultLayout from '../layouts/DefaultLayout'
import { BackButtonListener } from '../components/BackButtonListener'
import { AuthContextProvider } from '../context'
import Head from 'next/head'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <DefaultLayout>
      <BackButtonListener />
      <Load />
      <Component {...pageProps} />
    </DefaultLayout>
  )
}
export default MyApp

const Load = () => {
  const { config } = AuthContextProvider()

  return (
    <>
      <Head>
        <link id="favicon" rel="icon" href={config?.favicon} />
        <title>{config?.headTitle}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <meta name="description" content="¡Bodas de Hoy Organizador! Organiza tu boda en un sólo click., user-scalable=no, width=device-width, initial-scale=1" />
      </Head>
      <style jsx global>
        {`
      :root {
        --color-primary: ${config?.theme?.primaryColor};
        --color-secondary: ${config?.theme?.secondaryColor};
        --color-tertiary: ${config?.theme?.tertiaryColor};
        --color-base: ${config?.theme?.baseColor};
        --color-scroll: ${config?.theme?.colorScroll}
      }
      body {
          overscroll-behavior: contain;
      }
      ::-webkit-scrollbar {
        width: 8px;
      }
      ::-webkit-scrollbar-track {
        background: #f1f1f1
        border-radius: 6px;
      }

      ::-webkit-scrollbar-thumb {
        background:  ${config?.theme?.colorScroll};
        border-radius: 6px;
        height: 50%;
      }
      `}
      </style>
    </>
  )
}
