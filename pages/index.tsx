import { FC, useRef, useState, useEffect } from "react"
import BoxChat from "../components/BoxChat"
import Chats from '../components/Chats'
import ContactInfo from "../components/ContactInfo"
import { useSwipeable } from 'react-swipeable'
import PageLogin from './login'
import { AuthContextProvider, LoadingContextProvider } from '../context';
import { Navigation } from "../components/Surface/Navigation";
import { useRouter } from "next/router"
import { fetchApi, queries } from "../utils/Fetching";


export default function Home() {
  const r = useRouter()
  const { setEmailPassword } = AuthContextProvider()
  useEffect(() => {
    console.log(123, r.query)
    fetchApi({
      query: queries.getSignInStatus,
      variables: { uid: r?.query?.uid },
    }).then((value: any) => {
      console.log(456, value)
      !value && setEmailPassword(r?.query)
    })
  }, [r?.query, setEmailPassword]);

  const [active, setActive] = useState(0)
  const handler = useSwipeable({
    onSwipedLeft: (eventdata) => {
      if (active >= 0 && active < 2) {
        setActive(active + 1)
      }
    },
    onSwipedRight: (eventdata) => {
      if (active <= 2 && active > 0) {
        setActive(active - 1)
      }
    }
  })

  const myRef = useRef();
  const refPassthrough = (el: any) => {
    handler.ref(el);
    myRef.current = el;
  }
  const authContext = AuthContextProvider()
  console.log("authContext", authContext)
  const { user } = authContext
  const { verificandoCookie } = authContext
  console.log("verificandoCookie", verificandoCookie)
  console.log("user:", user)
  if (verificandoCookie) {
    console.log("hizo la verificación de cookie")
    if (!user) {
      console.log("pero no pazó la verificación")
      return <PageLogin />
    } else {
      console.log("y pazó la verificación devolviendo el usuario")
      return (
        <>
          <Navigation />
          <section {...handler} ref={refPassthrough} className="grid grid-cols-12 bg-base mx-auto inset-x-0 ">
            <Chats active={active == 0} />
            <BoxChat active={active == 1} />
            <ContactInfo active={active == 2} />
          </section>
          <style jsx>
            {`
            section {
              height: cal(100vh - 4rem);
            }
            `}
          </style>
        </>
      )
    }
  }
  return <></>
}