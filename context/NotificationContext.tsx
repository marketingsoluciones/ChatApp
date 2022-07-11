import {
  createContext,
  FC,
  useState,
  useEffect,
  useContext,
  Dispatch,
  SetStateAction
} from "react";
import { AuthContextProvider } from ".";
import { api } from '../api';
import useFetch from "../hooks/useFetch";
import { Notification } from "../interfaces/";
import { queries } from "../utils/Fetching";

interface ResultFetchNotification {
  total: number | null;
  results: Notification[];
}

type Context = {
  notication: ResultFetchNotification | null;
  setNotication: Dispatch<SetStateAction<Partial<Context | null>>>
};

const initialContext: Context = {
  notication: null,
  setNotication: () => { }
};

const NotificationContext = createContext<Context>(initialContext);

const NotificationProvider: FC = ({ children }): JSX.Element => {
  const { user } = AuthContextProvider()

  const [notication, setNotication, loadingContacts, errorContacts, fetchyApp] = useFetch({
    query: queries.getChats,
    variables: { uid: user?.uid },
    apiRoute: "graphqlApp"
  });

  useEffect(() => {

  }, [user])

  return (
    <NotificationContext.Provider value={{ notication, setNotication }}>
      {children}
    </NotificationContext.Provider>
  );
};



const NotificationContextProvider = () => useContext(NotificationContext)
export { NotificationContextProvider, NotificationProvider };