import { Chat, Contact, Notification } from '../interfaces/index';
import { SetStateAction, useEffect, useState, useCallback } from 'react';
import { ChatContextProvider } from '../context';

export const HandleDataContacts = (setContacts: any) => {
  const handleDataContacts = useCallback((data: Contact) => {
    setContacts((old: { total: number, results: Contact[] }) => {
      const existContact = old?.results?.findIndex((item: Contact) => item._id === data._id)
      if (existContact >= 0) {
        const nuevo = old.results.map((oldContact => {
          if (oldContact._id === data._id) {
            return {
              ...oldContact,
              eventos: [...oldContact.eventos, data.eventos[0]]
            }
          }
          return oldContact
        }))
        return {
          ...old,
          results: nuevo
        }
      }
      return {
        total: old.total++,
        results: [...old.results, data]
      }
    });
  }, [setContacts])
  return handleDataContacts
}

export const HandleDataNotifications = (setNotifications: any) => {
  const handleDataNotifications = useCallback((data: Notification) => {
    setNotifications(data);
  }, [setNotifications])
  return handleDataNotifications
}

export const HandleDataEvents = (setEvents: any) => {
  const handleDataEvents = useCallback((data: Event) => {
    setEvents(data);
  }, [setEvents])
  return handleDataEvents
}



export const HandleChats = (setActive: any, setChatId: any, chatId: string) => {
  setActive(1)
  setChatId(chatId)
}
type HandleContacts = {
  setPage: any
  setActive: any
  setChatId: any
  setContactUid: any
  item: any
}

export const HandleContacts = (props: HandleContacts): void => {
  //props.setPage(0)
  props.setActive(1)
  props.setContactUid(props?.item?.uid)
  props.setChatId(null)

}
type HandleEvents = {
  setPage: any
  setResultsContact: any
  contacts: any
  item: any
}
export const HandleEvents = (props: HandleEvents) => {
  props.setPage(1)
  const contactsReduce = props?.contacts?.results?.reduce((acc: any, iterador: any) => {
    console.log("iterador", iterador)
    const iteradorFilter = iterador?.eventos?.filter((elem: any) => {
      console.log(elem._id, props?.item?._id, elem._id == props?.item?._id)
      return elem._id == props?.item?._id
    })
    console.log("iteradorFilter", iteradorFilter)
    iteradorFilter.length > 0 && acc.push(iterador)
    return acc
  }, [])
  console.log("contactsReduce", contactsReduce)
  console.log("props.item", props.item)
  console.log("props.contacts", props.contacts)
  props.setResultsContact(contactsReduce)
}

type HandleCreateChat = {
  userUid: string
  contacts: any
  setConversation: any
  setChats: any
  setTestData: any
}

export const HandleCreateChat = ({ setConversation, setChats, setTestData, userUid, contacts }: HandleCreateChat) => {
  const handleCreateChat = useCallback((data: any) => {
    const add = data.addedes.filter((elem: any) => elem.userUid != userUid)[0]
    const contact = contacts.results.filter((elem: any) => elem.uid == add.userUid)[0]
    const chatNew = {
      ...data,
      addedes: [{
        userUid: add.userUid,
        type: add.type
      }],
      onLine: add.onLine,
      title: contact?.nickName,
      photoURL: contact?.photoURL,
    }
    chatNew.messages[0].createdAt = new Date(data.messages[0].createdAt).getTime()
    chatNew.createdAt = new Date(data.createdAt).getTime()
    chatNew.updatedAt = new Date(data.updatedAt).getTime()
    setChats((old: { total: number, results: Chat[] }) => {
      return {
        total: old.total + 1,
        results: [...old.results, { ...chatNew }]
      }
    })
  }, [userUid, setChats, contacts])
  return handleCreateChat
}

type HandleMessageChat = {
  setChats: any
}
export const HandleReceivesMessage = ({ setChats }: HandleMessageChat) => {
  const handleReceivesMessage = useCallback((data: any) => {
    setChats((old: { received: number, total: number, results: Chat[] }) => {
      const i = old.results.findIndex((elem: any) => elem._id == data.chatID)
      old.results[i].messages.push(data)
      return { ...old, received: old.received + 1 }
    })
  }, [setChats])
  return handleReceivesMessage
}

type HandleSendMessage = {
  messageSend?: string
  chat: any
  userUid: string
  setChats: any
  setChat: any
  socket: any
  // contacts: any
}
export const HandleSendMessage = (props: HandleSendMessage) => {
  if (props?.chat?._id) {
    props.setChats((old: any) => {
      const resultsMap = old.results.map((elem: any) => {
        if (elem._id == props.chat._id) {
          if (!elem.messages) elem.messages = []
          elem.messages = [...elem?.messages, {
            type: "text",
            emitUserUid: props.userUid,
            message: props.messageSend,
            //_id: "",
            createdAt: Date.now(),
          }]
          //props.setChat(elem)
        }
        return (elem)
      })
      const send = {
        chatID: props.chat?._id,
        receiver: props.chat?.addedes,
        data: {
          type: "text",
          message: props.messageSend,
        },
      }
      props.socket?.emit(`chatEvents:message`, send);
      return { total: old.total, results: resultsMap }
    })
    return
  }
  console.log(9, props.chat.addedes)
  // const emitor = ""
  // const receiver = props.contacts.results.filter((elem: any) => elem.uid == props.chat.addedes[0].userUid)
  // console.log("receiver", receiver)
  const send = {
    // emitor: {
    //   title: "",
    //   photoURL: ""
    // },
    receiver: {
      ids: props.chat.addedes.map((elem: any) => {
        return elem.userUid
      }),
      userUid: props.userUid,
      // title: "",
      // photoURL: ""

    },
    data: {
      message: props.messageSend,
      type: "text",
    },
  }
  console.log(10, send)
  props.socket.emit("chatEvents:create", send);
  //con la resouesta del emit se setea chat y chats
  // lo correcto es setear desde aca y crear componente y funcion para poner la bolita de procesando 
  //y con la respuesta marcar el ganchito de enviado

  console.log(1, props?.chat, 2, props?.messageSend, 3, props.userUid)

}
// type message {
//   _id: ID
//   type: String
//   emitUserUid: ID
//   message: String
//   fileUrl: String
//   createdAt: Float
//   received: Float
//   read: Boolean
//   deletedEmit: Boolean
//   deletedReceiv: Boolean
// }