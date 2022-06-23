import {
  createContext,
  FC,
  useState,
  useEffect,
  useContext,
} from "react";
import { Socket } from "socket.io-client";
import { AuthContextProvider } from ".";
import { api } from '../api';
import Cookies from "js-cookie";


type Context = {
  socket: Socket | null;
  //setSocket : Dispatch<SetStateAction<Socket | null>>
};

const initialContext: Context = {
  socket: null,
  //setSocket : () => {}
};

const SocketContext = createContext<Context>(initialContext);

const SocketProvider: FC = ({ children }): JSX.Element => {
  const { user } = AuthContextProvider()
  const [socket, setSocket] = useState<Socket | null>(initialContext.socket);

  useEffect(() => {
    console.log("setSocket", user)
    const token = Cookies.get("idToken")
    console.log("token", token)
    console.log("socket", socket?.connected)
    if (token && !socket?.connected) {
      console.log("Conecta...")
      setSocket(api.socketIO({ token }));
    }
    if (!token && socket) {
      console.log("desconecta...")
      socket.disconnect();
    }
  }, [user])

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};

const SocketContextProvider = () => useContext(SocketContext)

export { SocketProvider, SocketContextProvider };
