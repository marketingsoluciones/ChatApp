import { Chat, Contact } from '../interfaces/index';
import { SetStateAction, useEffect, useState, useCallback } from 'react';
import { queries } from '../utils/Fetching';

import { AuthContextProvider, SocketContextProvider } from '.';
import {
  createContext,
  FC,
  Dispatch,
  useContext,
} from "react";
import useFetch from '../hooks/useFetch';


interface ResultFetchChats {
  total: number | null;
  results: Chat[];
}
interface ResultFetchContacts {
  total: number | null;
  results: Contact[];
}
type Context = {
  chats: ResultFetchChats
  setChats: Dispatch<SetStateAction<ResultFetchChats>>
  loadingChats?: boolean
  errorChats?: boolean
  fetch?: any
  fetchy?: any
  conversation?: stateConversation | null,
  setConversation: Dispatch<SetStateAction<stateConversation>>
  show?: boolean,
  setShow: Dispatch<SetStateAction<boolean>>,
  contacts: ResultFetchContacts,
  setContacts: Dispatch<SetStateAction<ResultFetchContacts>>
};

const initialContext: Context = {
  chats: {
    total: null,
    results: []
  },
  setChats: () => null,
  loadingChats: false,
  errorChats: false,
  fetch: () => { },
  fetchy: () => { },
  conversation: null,
  setConversation: () => { },
  show: false,
  setShow: () => { },
  contacts: {
    total: null,
    results: []
  },
  setContacts: () => null,
};

const ChatContext = createContext<Context>(initialContext);

// Verificar si es necesario que este en contexto


const initialState = { state: false, data: null };



interface stateConversation {
  state: boolean;
  data: Chat | null;
}

const ChatProvider: FC = ({ children }): JSX.Element => {
  const { user } = AuthContextProvider()
  const { socket, socketApp } = SocketContextProvider();
  const [limit, setLimit] = useState(5)
  const [skip, setSkip] = useState(0)
  const [show, setShow] = useState(false);
  const [conversation, setConversation] =
    useState<stateConversation>(initialState);
  const [chats, setChats, loadingChats, errorChats, fetchy] = useFetch({
    query: queries.getChats,
    variables: { uid: user?.uid, limit, skip },
  });

  const [contacts, setContacts, loadingContacts, errorContacts, fetchyApp] = useFetch({
    query: queries.getChats,
    variables: { uid: user?.uid, limit, skip },
    apiRoute: "graphqlApp"
  });




  const fetch = () => {
    fetchy({ query: queries.getChats, variables: { uid: user?.uid, limit, skip } });
  }


  useEffect(() => {
    fetch()
    fetchyApp({ query: queries.getContacts, variables: { uid: user?.uid }, apiRoute: "graphqlApp" })

  }, [user?.uid]);

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
  }, [])

  const handleDataContacts = useCallback((contact: Contact) => {
    setContacts((old: { total: number, results: Contact[] }) => {
      const existContact = old?.results?.findIndex((item: Contact) => item._id === contact._id)
      if (existContact >= 0) {
        //handleAddEventoToContact: "${nickName} también ha sido invitada al evento: ${nombre}"
        const nuevo = old.results.map((oldContact => {
          if (oldContact._id === contact._id) {
            return {
              ...oldContact,
              eventos: [...oldContact.eventos, contact.eventos[0]]
            }
          }
          return oldContact
        }))
        return {
          ...old,
          results: nuevo
        }
      }
      //handleNewContact "${nickName} ha sido invitada al evento: ${nombre} y se agregó a tu lista de contactos"
      return {
        total: old.total++,
        results: [...old.results, contact]
      }
    });
  }, [])

  useEffect(() => {
    socket?.on("chatBusiness:create", handleCreateChat)
    return () => {
      socket?.off('chatBusiness:create', handleCreateChat)
    }
  }, [socket, handleCreateChat]);

  useEffect(() => {
    socketApp?.on("dataContact", handleDataContacts)
    return () => {
      socketApp?.off('dataContact', handleDataContacts)
    }
  }, [socketApp, handleDataContacts]);

  return (
    <ChatContext.Provider value={{ chats, setChats, loadingChats, errorChats, fetch, conversation, setConversation, fetchy, show, setShow, contacts, setContacts }}>
      {children}
    </ChatContext.Provider>
  );
};

const ChatContextProvider = () => useContext(ChatContext);

export { ChatProvider, ChatContextProvider };
