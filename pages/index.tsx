import { useRef, useState, useEffect } from "react"
import BoxChat from "../components/BoxChat"
import Chats from '../components/Chats'
import { useSwipeable } from 'react-swipeable'
import PageLogin from './Pagelogin'
import { AuthContextProvider, LoadingContextProvider } from '../context';
import { Navigation } from "../components/Surface/Navigation";
import { useRouter } from "next/router"
import { fetchApi, queries } from "../utils/Fetching";
import BoxChatIni from "../components/BoxChatIni"
import ContactInfo from "../components/ContactInfo"

export default function Home() {
  const { setLoading } = LoadingContextProvider()
  setLoading(false)
  const r = useRouter()
  const { emailPassword, setEmailPassword, user, verificationDone } = AuthContextProvider()

  useEffect(() => {
    if (verificationDone) {
      fetchApi({
        query: queries.getSignInStatus,
        variables: { uid: r?.query?.uid },
        apiRoute: "ApiBodas",
        type: "json"
      }).then((value: any) => {
        !value && setEmailPassword(r?.query)
      })
    }
  }, [r?.query, setEmailPassword, verificationDone]);

  const [active, setActive] = useState(0)
  const [chat, setChat] = useState(null)
  useEffect(() => {
  }, [chat]);
  const handler = useSwipeable({

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
  if (verificationDone) {
    if (!user) {
      return <PageLogin valir={!emailPassword?.email} />
    }
    return (
      <>
        <Navigation />
        <div>
          <section {...handler} ref={refPassthrough} className="grid grid-cols-12 bg-base mx-auto inset-x-0 ">
            {<Chats active={active == 0} setActive={setActive} setChat={setChat} />}
            {active == 0 && <BoxChatIni active={active == 0} />}
            {active != 0 && <BoxChat active={active == 1} chat={chat ? chat : null} setChat={setChat} />}
            {/* {<ContactInfo active={active == 2} />} */}
          </section>
        </div>
        <style jsx>
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
  return <></>
}