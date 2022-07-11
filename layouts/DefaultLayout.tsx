import dynamic from "next/dynamic";
import { LoadingProvider, ToastProvider } from "../context";
import { FC } from "react";

const DynamicAuthProvider = dynamic((): any =>
  import("../context").then((mod) => mod.AuthProvider)
);
const DynamicSocketProvider = dynamic((): any =>
  import("../context").then((mod) => mod.SocketProvider)
);
const DynamicChatsProvider = dynamic((): any =>
  import("../context").then((mod) => mod.ChatProvider)
);

const DynamicNotificationProvider = dynamic((): any =>
  import("../context").then((mod) => mod.NotificationProvider)
);

const DefaultLayout: FC = ({ children }) => {



  return (
    <DynamicAuthProvider>
      <DynamicSocketProvider>
        <DynamicChatsProvider>
          <LoadingProvider>
            <ToastProvider>
              <main className="h-auto bg-base">
                {children}
              </main>
            </ToastProvider>
          </LoadingProvider>
        </DynamicChatsProvider>
      </DynamicSocketProvider>
    </DynamicAuthProvider>
  );

};

export default DefaultLayout;




