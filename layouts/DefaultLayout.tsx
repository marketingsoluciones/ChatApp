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

const DynamicToastProvider = dynamic((): any =>
  import("../context").then((mod) => mod.ToastProvider)
);

const DefaultLayout: FC = ({ children }) => {



  return (
    <DynamicAuthProvider>
      <DynamicSocketProvider>
        <DynamicChatsProvider>
          <LoadingProvider>
            <DynamicToastProvider>
              <div className="min-h-screen w-full h-full">
                {children}
              </div>
            </DynamicToastProvider>
          </LoadingProvider>
        </DynamicChatsProvider>
      </DynamicSocketProvider>
    </DynamicAuthProvider>
  );

};

export default DefaultLayout;




