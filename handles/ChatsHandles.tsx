import { Chat, Contact, Notification } from '../interfaces/index';
import { SetStateAction, useEffect, useState, useCallback } from 'react';

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
export const HandleCreateChat = (setConversation: any, setChats: any) => {
  const handleCreateChat = useCallback((data: Chat) => {
    setConversation({ state: true, data })
    setChats((old: any) => {
      if (old?.results?.findIndex((item: any) => item._id === data._id) === -1) {
        return {
          ...old,
          results: [data, ...old?.results]
        };
      } else {
        return old
      }
    });
  }, [setConversation, setChats])
  return handleCreateChat
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
  props.setPage(0)
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
  console.log({ total: contactsReduce.length, results: contactsReduce })
  console.log(props.item)
  console.log(props.contacts)
  props.setResultsContact({ total: contactsReduce.length, results: contactsReduce })
}