import dynamic from "next/dynamic";
import { LoadingProvider, LoadingContextProvider, AuthContextProvider } from "../context";
import { FC } from "react";

const DynamicAuthProvider = dynamic((): any =>
  import("../context").then((mod) => mod.AuthProvider)
);


const DefaultLayout: FC = ({ children }) => {



  return (
    <DynamicAuthProvider>
      <LoadingProvider>
        <main className="h-auto bg-base">
          {children}
        </main>
      </LoadingProvider>
    </DynamicAuthProvider>
  );

};

export default DefaultLayout;




