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
import { BackButtonListener } from "../components/BackButtonListener"
import Configuration from './configuracion'
import DatosConfirmation from './Confirmation'

export default function Home() {
  const r = useRouter()
  const { setEmailPassword } = AuthContextProvider()
  useEffect(() => {
    fetchApi({
      query: queries.getSignInStatus,
      variables: { uid: r?.query?.uid },
    }).then((value: any) => {
      !value && setEmailPassword(r?.query)
    })
  }, [r?.query, setEmailPassword]);

  const [active, setActive] = useState(0)
  const [chatId, setChatId] = useState(null)
  const [chat, setChat] = useState(null)
  const handler = useSwipeable({
    // onSwipedLeft: (eventdata) => {
    //   if (active >= 0 && active < 2) {
    //     setActive(active + 1)
    //   }
    // },
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
    }
    else {
      if (!user.displayName) {
        return <DatosConfirmation />
      } else {
        console.log("y pazó la verificación devolviendo el usuario")
        return (
          <>
            <Navigation />
            <div>
              <BackButtonListener />
              <section {...handler} ref={refPassthrough} className="grid grid-cols-12 bg-base mx-auto inset-x-0 ">
                <Chats active={active == 0} setActive={setActive} setChat={setChat} />
                <BoxChat active={false} chat={chat ? chat : null} />
                <ContactInfo active={active == 2} />
              </section>
            </div>
            <style >
              {`
              section {
                height: cal(100vh - 4rem);
              }
              .calHeight1 {
                height: calc(100vh - 8rem);
                overflow: scroll;
              }
              `}
            </style>
          </>
        )
      }

    }
  }
  return <></>
}