import { Chat, Contact, Notification, Event, detalles_compartidos_array } from '../interfaces/';
import { SetStateAction, useEffect, useState, useCallback } from 'react';
import { fetchApi, queries } from '../utils/Fetching';
import { AuthContextProvider, SocketContextProvider, NotificationContextProvider } from '.';
import { createContext, FC, Dispatch, useContext } from "react";
import { HandleCreateChat, HandleDataContacts, HandleDataNotifications, HandleDataEvents, HandleReceivesMessage } from '../handles'

interface stateConversation {
  state: boolean;
  data: Chat | null
}
interface ResultFetchChats {
  received: number
  total: number
  results: Chat[]
}
interface ResultFetchContacts {
  total: number
  results: Contact[]
}
interface ResultFetchNotifification {
  total: number
  results: Notification[]
}
interface ResultFetchEvent {
  total: number
  results: Event[]
}

type Context = {
  chats: ResultFetchChats
  setChats: Dispatch<SetStateAction<ResultFetchChats>>
  conversation?: stateConversation
  setConversation: Dispatch<SetStateAction<stateConversation>>
  show?: boolean
  setShow: Dispatch<SetStateAction<boolean>>
  contacts: ResultFetchContacts
  setContacts: Dispatch<SetStateAction<ResultFetchContacts>>
  notifications: ResultFetchNotifification
  setNotifications: Dispatch<SetStateAction<ResultFetchNotifification>>
  events: ResultFetchEvent
  setEvents: Dispatch<SetStateAction<ResultFetchEvent>>
};

const initialContext: Context = {
  chats: { total: 0, received: 0, results: [] },
  setChats: () => null,
  conversation: { data: null, state: false },
  setConversation: () => { },
  show: false,
  setShow: () => { },
  contacts: { total: 0, results: [] },
  setContacts: () => null,
  notifications: { total: 0, results: [] },
  setNotifications: () => { },
  events: { total: 0, results: [] },
  setEvents: () => { }
};

const ChatContext = createContext<Context>(initialContext);
const initialState = { state: false, data: null };

const ChatProvider: FC = ({ children }): JSX.Element => {
  const { user, config, verificationDone } = AuthContextProvider()
  const { socket, socketApp } = SocketContextProvider()
  const [limit, setLimit] = useState(20)
  const [skip, setSkip] = useState(0)
  const [show, setShow] = useState(false)
  const [conversation, setConversation] = useState<stateConversation>({ data: null, state: false })
  const [chats, setChats] = useState<ResultFetchChats>({ received: 0, total: 0, results: [] })
  const [contacts, setContacts] = useState<ResultFetchContacts>({ total: 0, results: [] })
  const [events, setEvents] = useState<ResultFetchEvent>({ total: 0, results: [] })
  const [notifications, setNotifications] = useState<ResultFetchNotifification>({ total: 0, results: [] })
  const [isMounted, setIsMounted] = useState(false)

  const getEvents = async () => {
    try {
      const eventsGuess: ResultFetchEvent = await fetchApi({
        query: queries.getEventsGuess,
        variables: { uid: user?.uid },
        apiRoute: "ApiApp",
        type: 'json'
      })
      const eventsOwner: Event[] = await fetchApi({
        query: queries.getEventsByID,
        variables: { variable: "usuario_id", valor: user?.uid, development: config?.development },
        apiRoute: "ApiApp",
        type: 'json'
      })
      console.log(100084, { eventsGuess, eventsOwner })
      let eventsResult: Event[] = [...eventsGuess.results, ...eventsOwner]
      const uniqueEvents: Event[] = [];
      const seenIds: any = {};

      for (const item of eventsResult) {
        if (!seenIds[item._id]) {
          uniqueEvents.push(item);
          seenIds[item._id] = true;
        }
      }
      return uniqueEvents
    } catch (error) {
      console.log(error)
      return []
    }
  }

  useEffect(() => {
    if (!isMounted && chats?.total > 0 && contacts?.total > 0) {
      setIsMounted(true)
      const resultsReduce = chats?.results.reduce((acc: any, item: any) => {
        const itemFilter = contacts?.results.filter((elem: any) => elem.uid == item.addedes[0]?.userUid)[0]
        const itemNew = {
          ...item, title: itemFilter?.nickName, photoURL: itemFilter?.photoURL
        }
        acc.push(itemNew)
        return acc
      }, [])
      const resultsOrder = resultsReduce.sort((a: any, b: any) => a.updateAt - b.updateAt)
      const chatsNew = {
        received: 0,
        total: chats.total,
        results: resultsOrder
      }
      setChats(chatsNew)
    }
  }, [chats, contacts, isMounted, setChats]);

  useEffect(() => {
    if (verificationDone) {
      fetchApi({
        query: queries.getChats,
        variables: { uid: user?.uid, origin: "chatevents", limit, skip },
        apiRoute: "ApiBodas",
        type: 'json'
      }).then(result => setChats(result))
      fetchApi({
        query: queries.getContacts,
        variables: { uid: user?.uid },
        apiRoute: "ApiApp",
        type: 'json'
      }).then(result => setContacts(result))

      getEvents()
        .then(results => {
          const events = {
            total: results.length,
            results: results
          }
          setEvents({ ...events })
          interface Acc {
            uid: string
            eventos: Event[]
            correo?: string
          }
          const moreContacts = events.results.reduce((acc: Acc[], item) => {
            if (item.usuario_id !== user?.uid) {
              const f1 = acc.findIndex(el => el.uid === item.usuario_id)
              if (f1 < 0) {
                acc.push({
                  uid: item.usuario_id,
                  eventos: [item]
                })
              } else {
                acc[f1].eventos.push(item)
              }
            }
            item.detalles_compartidos_array.map(elem => {
              if (elem.uid !== user?.uid) {
                const f1 = acc.findIndex(el => el.uid === elem.uid)
                if (f1 < 0) {
                  acc.push({
                    uid: elem.uid,
                    correo: elem.email,
                    eventos: [item]
                  })
                } else {
                  acc[f1].eventos.push(item)
                }
              }
            })
            return acc
          }, [])
          const allContacts = [...contacts?.results ?? [], ...moreContacts] as Contact[]
          const uids = allContacts.map(elem => elem.uid)
          fetchApi({
            query: queries.getUsers,
            variables: { uids },
            apiRoute: "ApiBodas",
            type: 'json'
          }).then(result => {
            const contacts = allContacts.map(elem => {
              const f1 = result.findIndex((el: { uid: string; }) => el.uid === elem.uid)
              return { ...elem, ...result[f1], nickName: result[f1]?.displayName }
            })
            console.log(contacts)
            setContacts({
              total: contacts.length,
              results: [...contacts]
            })
          })
        })
    }
  }, [user?.uid, verificationDone]);

  const handleCreateChat = (() => {
    // console.log(11223311, contacts)
    return HandleCreateChat({ setConversation, setChats, userUid: user?.uid ? user?.uid : "", contacts })
  })()
  const handleReceivesMessage = (() => {
    // console.log(11223311, contacts)
    return HandleReceivesMessage({ setChats })
  })()
  const handleDataContacts = HandleDataContacts(setContacts)
  const handleDataNotifications = HandleDataNotifications(setNotifications)
  const handleDataEvents = HandleDataEvents(setEvents)

  useEffect(() => {
    socket?.on("chatEvents:create", handleCreateChat)
    socket?.on("chatEvents:message", handleReceivesMessage)
    return () => {
      socket?.off("chatEvents:create")
      socket?.off("chatEvents:message")
    }
  }, [socket, handleCreateChat, handleReceivesMessage]);

  // useEffect(() => {
  //   socket?.on("chatEvents:message", (data) => {
  //     const chatsNew = chats?.results?.map((elem: any) => {
  //       if (elem._id == data.chatID) {
  //         elem.messages.push(data)
  //       }
  //       return elem
  //     })
  //     console.log(chatsNew)
  //   })
  //   return () => {
  //     socket?.off('chatEvents:message')
  //   }
  // }, [socket, chats]);

  useEffect(() => {
    socketApp?.on("dataContact", handleDataContacts)
    socketApp?.on("dataNotification", handleDataNotifications)
    socketApp?.on("dataEvents", handleDataEvents)
    return () => {
      socketApp?.off('dataContact', handleDataContacts)
    }
  }, [socketApp, handleDataContacts, handleDataNotifications, handleDataEvents]);

  return (
    <ChatContext.Provider value={{ chats, setChats, conversation, setConversation, show, setShow, contacts, setContacts, notifications, setNotifications, events, setEvents }}>
      {children}
    </ChatContext.Provider>
  );
};

const ChatContextProvider = () => useContext(ChatContext);
export { ChatProvider, ChatContextProvider };
