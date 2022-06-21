import dynamic from "next/dynamic";
import { LoadingProvider, LoadingContextProvider } from "../context";
import { FC, useEffect } from "react";
import { BellIcon } from "../components/icons";
import Button from '../components/Button'
import Image from 'next/image'
import Logo from '../public/logo.png'
import PageLogin from '../pages/login'

const DynamicAuthProvider = dynamic((): any =>
  import("../context").then((mod) => mod.AuthProvider)
);


const DefaultLayout: FC = ({ children }) => {
  const { setLoading } = LoadingContextProvider()
  //useEffect(() => {
  //  setLoading(false);
  //});
  const valir = true
  if (!valir) {
    return (
      <>
        <DynamicAuthProvider>
          <LoadingProvider>
            {children}
          </LoadingProvider>
        </DynamicAuthProvider>
      </>
    )
  } else {
    return (
      <DynamicAuthProvider>
        <LoadingProvider>
          <div className="h-screen min-h-screen">
            <div className="h-16 w-full" />
            <div className="bg-white h-16 w-full shadow-md fixed top-0 z-30">
              <nav className="flex justify-between items-center xl:max-w-screen-xl lg:max-w-screen-lg md:max-w-screen-md px-5 md:px-0 w-full mx-auto inset-x-0 h-full">
                <Image
                  alt="Logo-BodasDeHoy"
                  src={Logo}
                  className="object-contain"
                  width={160}
                  height={100}
                />
                <div className="flex items-center gap-4 h-full">
                  <Button title={"Invita amigos"} onClick={() => console.log("Hola mundo")} className="hidden md:block bg-primary text-white px-3 py-2 rounded-lg text-sm transition hover:opacity-90" />
                  <Notification />
                  <Profile />
                </div>
              </nav>
            </div>
            <main className="h-auto bg-base">
              {children}
            </main>
          </div>
        </LoadingProvider>
      </DynamicAuthProvider>
    );
  }
};

export default DefaultLayout;

// Componente Perfil
const Profile: FC = () => {
  return (
    <div className="flex items-center gap-2 cursor-pointer">
      <div className="rounded-full w-10 h-10 bg-tertiary object-cover object-center" />
      <span className="flex flex-col gap-1 text-left">
        <h2 className="truncate font-medium leading-tight text-sm text-black">
          Keanus Reeves
        </h2>
        <p className="truncate font-regular leading-tight text-xs text-gray-200">
          Frontend Enginner
        </p>
      </span>
    </div>
  );
};

// Componente icono de Notificaciones
const Notification: FC = () => {
  return (
    <div className="flex items-center px-4 md:border-l md:border-r md:border-base h-full cursor-pointer">
      <span className="relative">
        <BellIcon className="w-6 h-6 text-gray-100" />
        <svg className="rounded-full bg-primary w-2 h-2 absolute top-0 right-0" />
      </span>
    </div>
  );
};


