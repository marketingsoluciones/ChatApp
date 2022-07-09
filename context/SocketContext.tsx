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
  socketApp: Socket | null;
  //setSocket : Dispatch<SetStateAction<Socket | null>>
};

const initialContext: Context = {
  socket: null,
  socketApp: null,
  //setSocket : () => {}
};

const SocketContext = createContext<Context>(initialContext);

const SocketProvider: FC = ({ children }): JSX.Element => {
  const { user } = AuthContextProvider()
  const [socket, setSocket] = useState<Socket | null>(initialContext.socket);
  const [socketApp, setSocketApp] = useState<Socket | null>(initialContext.socket);

  useEffect(() => {
    console.log("setSocket", user)
    const token = Cookies.get("idToken")
    console.log("token", token)
    console.log("socket", socket?.connected)
    if (token && !socket?.connected) {
      console.log("Conecta...")
      setSocket(api.socketIO({ token }));
    }
    if (token && !socketApp?.connected) {
      console.log("Conecta...App")
      setSocketApp(api.socketIOApp({ token }));
    }
    if (!token && socket) {
      console.log("desconecta...")
      socket.disconnect();
    }
    if (!token && socketApp) {
      console.log("desconecta...")
      socketApp.disconnect();
    }
  }, [user])

  return (
    <SocketContext.Provider value={{ socket, socketApp }}>
      {children}
    </SocketContext.Provider>
  );
};

const SocketContextProvider = () => useContext(SocketContext)

export { SocketProvider, SocketContextProvider };
