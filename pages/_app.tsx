import '../styles/globals.css'
import "@fontsource/poppins"
import "swiper/components/pagination/pagination.min.css"
import "swiper/swiper.min.css";
import type { AppProps } from 'next/app'
import DefaultLayout from '../layouts/DefaultLayout'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <DefaultLayout>
      <Component {...pageProps} />
    </DefaultLayout>
  )
}
export default MyApp
