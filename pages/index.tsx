import { useRef, useState, useEffect, ComponentType, Dispatch } from "react"
import BoxChat from "../components/BoxChat"
import Chats from '../components/Chats'
import { useSwipeable } from 'react-swipeable'
import PageLogin from './Pagelogin'
import { AuthContextProvider, ChatContextProvider, LoadingContextProvider, SocketContextProvider } from '../context';
import { Navigation } from "../components/Surface/Navigation";
import { useRouter } from "next/router"
import { fetchApi, queries } from "../utils/Fetching";
import BoxChatIni from "../components/BoxChatIni"
import ContactInfo from "../components/ContactInfo"
import Cookies from 'js-cookie';
import dynamic from "next/dynamic"
import { AppProps, ThemeChat, SendMessage, ResultChats, ResultContacts } from "../dis"
import { HandleSendMessage } from "../handles"
import { Profile } from "../components/Profile"
import { Notification } from "../components/Notification"

const ChatApp: ComponentType<AppProps> = dynamic(
  () => import('../../chat-component/dist').then((mode) => {
    return mode.App
  }),
  {
    ssr: false,
  }
);

export default function Home() {
  const { setLoading } = LoadingContextProvider()
  const { config } = AuthContextProvider()
  const { chats, setChats, show, setShow, contacts, events } = ChatContextProvider();
  const { socket } = SocketContextProvider();
  setLoading(false)
  const r = useRouter()
  const { emailPassword, setEmailPassword, user, verificationDone } = AuthContextProvider()

  const themeChat: ThemeChat = {
    primaryColor: config?.theme?.primaryColor,
    secondaryColor: config?.theme?.secondaryColor,
    tertiaryColor: config?.theme?.tertiaryColor,
    baseColor: config?.theme?.baseColor,
  }

  const sendMessage: Dispatch<SendMessage> = ({ chat, message, type }) => {
    HandleSendMessage({
      messageSend: message,
      chat: chat,
      userUid: user?.uid ? user.uid : "",
      setChats: setChats,
      setChat: setChat,
      socket: socket,
    })
  }

  const portals = {
    results: [],
    total: 0
  }

  const handleSearchChat = async (value: string): Promise<ResultChats> => {
    const data = await fetchApi({
      query: queries.getChats,
      variables: { origin: "chatevents", uid: user?.uid, text: value, skip: 0, limit: 5 },
      apiRoute: "ApiBodas",
      type: "json"
    })

    console.log(100020, data)
    return data
  };

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
      <div className="w-screen h-screen flex-1">
        {true
          ? <ChatApp
            userUid={user?.uid ? user.uid : ""}
            label="MovilDemo: "
            token={Cookies.get("idTokenChat") ?? ""}
            theme={themeChat}
            chats={chats}
            contacts={contacts}
            events={events}
            notifications={[]}
            sendMessage={sendMessage}
            getScraperMetaData={handleSearchChat}
            elementLogo={
              <span className="ml-2">
                {config.logoDirectory}
              </span>
            }
            elementPerfil={
              <span className="mr-2">
                <Profile />
              </span>
            }
            elementNotifications={
              <Notification valir={true} value={5} onClick={() => { }} />
            }
          />
          : <>
            <Navigation />
            <div className="bg-green-200">
              <section {...handler} ref={refPassthrough} className="bg-red-200 grid grid-cols-12 bg-base mx-auto inset-x-0">
                {<Chats active={active == 0} setActive={setActive} setChat={setChat} />}
                {active == 0 && <BoxChatIni active={active == 0} />}
                {active != 0 && <BoxChat active={active == 1} chat={chat ? chat : null} setChat={setChat} />}
              </section>
            </div>

          </>
        }
      </div>
    )
  }
  return <></>
}