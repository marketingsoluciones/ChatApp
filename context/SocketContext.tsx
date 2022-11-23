import { createContext, FC, useState, useEffect, useContext } from "react";
import { Socket } from "socket.io-client";
import { AuthContextProvider } from ".";
import { api } from '../api';
import Cookies from "js-cookie";


type Context = {
  socket: Socket | null;
  socketApp: Socket | null;
};

const initialContext: Context = {
  socket: null,
  socketApp: null,
};

const SocketContext = createContext<Context>(initialContext);

const SocketProvider: FC = ({ children }): JSX.Element => {
  const { user } = AuthContextProvider()
  const [socket, setSocket] = useState<Socket | null>(initialContext.socket);
  const [socketApp, setSocketApp] = useState<Socket | null>(initialContext.socket);

  useEffect(() => {
    const token = Cookies.get("idTokenChat")
    if (token && !socket?.connected) {
      setSocket(api.socketIO({ token }));
    }
    if (token && !socketApp?.connected) {
      setSocketApp(api.socketIOApp({ token }));
    }
    if (!token && socket) {
      socket.disconnect();
    }
    if (!token && socketApp) {
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
