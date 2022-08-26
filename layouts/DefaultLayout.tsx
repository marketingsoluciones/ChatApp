import dynamic from "next/dynamic";
import { LoadingProvider, ToastProvider } from "../context";
import { FC } from "react";
import Head from "next/head";

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
    <>
      <Head>
        <title>Bodas de hoy - Chat con Invitados</title>
        <meta name="description" content="¡Bodas de Hoy! Chatea con todos los invitados a la Boda." />
      </Head>
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
    </>
  );

};

export default DefaultLayout;




