import dynamic from "next/dynamic";
import { LoadingProvider } from "../context";
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

const DefaultLayout: FC = ({ children }) => {



  return (
    <DynamicAuthProvider>
      <DynamicSocketProvider>
        <DynamicChatsProvider>
          <LoadingProvider>
            <main className="h-auto bg-base">
              {children}
            </main>
          </LoadingProvider>
        </DynamicChatsProvider>
      </DynamicSocketProvider>
    </DynamicAuthProvider>
  );

};

export default DefaultLayout;




