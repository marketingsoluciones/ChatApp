import { MiPerfil } from "../components/ConfiguracionPerfil/MiPerfil";
import { PerfilFoto } from "../components/ConfiguracionPerfil/PerfilFoto";
import { PerfilOpciones } from "../components/ConfiguracionPerfil/PerfilOpciones";
import { FC, useState } from "react";
import {  UserIcon  } from "../components/Icons/";
import PagesWithAuth from "../HOC/PagesWithAuth";
//import { ExitIcon } from '../components/Icons/index';
import {AuthContextProvider, LoadingContextProvider} from '../context'
import { deleteCookie } from "../utils/Cookies";
import { useRouter } from "next/router";
import { useToast } from '../hooks/useToast';
import Cookies from "js-cookie";
import { useAuthentication } from '../utils/Authentication';
import { Navigation } from "../components/Surface/Navigation";

export type optionComponent = {
  title: string;
  icon: any;
  component: any;
};

const Configuration = () => {
  const [isActive, setActive] = useState(0);
  const {setLoading} = LoadingContextProvider()
  const {setUser} = AuthContextProvider()
  const {_signOut} = useAuthentication()
  const router = useRouter()
  const toast = useToast()

  const components: optionComponent[] = [
    { title: "Mi perfil", 
      icon: <UserIcon />, 
      component: <MiPerfil /> },
  ];

  const handleClickOption = (idx: number) => {
    setActive(idx);
  };

  const handleSignOut = async () => {
      try {
        setLoading(true);
      _signOut()
      } catch (error) {
        toast("error", "Ups.. Hubo un error")
        console.log(error)
      } finally {
        setLoading(false);
      }
  }

  return (<>
  
  <Navigation />
    <section className="max-w-screen-lg  mx-auto inset-x-0 grid grid-cols-1 md:grid-cols-4 md:py-28 -mt-4 md:mt-0 md:gap-10">
      <div className="flex flex-col items-center justify-start w-full text-sm gap-6">
        <PerfilFoto />
        <button onClick={handleSignOut} className="bg-red-500 px-3 py-1 rounded text-white text-sm sm:hidden top-2 left-2 flex items-center gap-2">{/* <ExitIcon/> */} Cerrar sesión</button>
        <PerfilOpciones
          components={components}
          actived={isActive}
          onClick={handleClickOption}
        />
      </div>
      <div className="col-span-3 p-5 md:p-0">{components[isActive].component}</div>
    </section>
    </>
  );
};
export default PagesWithAuth(Configuration);

export const BlockConfiguration: FC<{ title: string; subtitle?: string }> = ({
  title,
  subtitle,
  children,
}) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow flex flex-col gap-2">
      <div>
        <h2 className=" font-bold text-xl">{title}</h2>
        {subtitle && <small className="text-gray-600">{subtitle}</small>}
      </div>
      <div>{children}</div>
    </div>
  );
};
