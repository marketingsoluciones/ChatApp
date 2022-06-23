import dynamic from "next/dynamic";
import { LoadingProvider } from "../context";
import { FC } from "react";

const DynamicAuthProvider = dynamic((): any =>
  import("../context").then((mod) => mod.AuthProvider)
);
const DynamicSocketProvider = dynamic((): any =>
  import("../context").then((mod) => mod.SocketProvider)
);


const DefaultLayout: FC = ({ children }) => {



  return (
    <DynamicAuthProvider>
      <DynamicSocketProvider >
        <LoadingProvider>
          <main className="h-auto bg-base">
            {children}
          </main>
        </LoadingProvider>
      </DynamicSocketProvider >
    </DynamicAuthProvider>
  );

};

export default DefaultLayout;




