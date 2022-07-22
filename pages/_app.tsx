import '../styles/globals.css'
import "@fontsource/poppins"
import type { AppProps } from 'next/app'
import DefaultLayout from '../layouts/DefaultLayout'
import { BackButtonListener } from '../components/BackButtonListener'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <DefaultLayout>
      <BackButtonListener />
      <Component {...pageProps} />
    </DefaultLayout>
  )
}
export default MyApp
