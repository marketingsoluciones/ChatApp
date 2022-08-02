import { FC, ReactNode, useEffect, useState } from "react";
import { ButtonClose } from "../components/Inputs";
import router from "next/router";
import { Login } from '../components/Login/Login';
import { LoadingContextProvider } from '../context';
import { UserMax } from "../context/AuthContext";
import { ResetPass } from "../components/Login/Forms/FormResetPass";
import { Register } from "../components/Login/Forms/FormRegister";
import { LogoFullColor } from "../components/Icons";
//import { AuthContextProvider } from "../context";

// Tipos de datos personalizados
type Forms = {
  login?: ReactNode;
  register?: ReactNode;
  ForgetPassword?: ReactNode;
  resetPassword?: ReactNode;
};

interface propsPageLogin {
  valir: boolean
}

const PageLogin: FC<propsPageLogin> = ({ valir }) => {

  const { setLoading } = LoadingContextProvider()

  useEffect(() => {
    console.log("useEffect")
    setLoading(false);
  }, [setLoading]);

  //const { user } = AuthContextProvider();
  const [stage, setStage] = useState<keyof typeof Stages>(valir ? "login" : "register");
  //const { user, userTemp, setUserTemp } = AuthContextProvider();


  const Stages: Forms = {
    login: <Login setStage={setStage} />,
    register: <Register setStage={setStage} />,
    resetPassword: <ResetPass setStage={setStage} />
  };

  const keyDown: any = (event: KeyboardEvent) => {
    const keyName: string = event.key;
    keyName?.toLowerCase() === "escape" && router.push("/");
  };

  /* //al desmontar componente
  useEffect(() => {
   return () => {
     setUserTemp(null)
   }
 }, []);
 // al entrar a login
 useEffect(() => {
   if (stage == "login") {
     setUserTemp(null)
   }
 }, [stage]); */

  /*useEffect(() => {
    user?.uid && !user.city && setStage("register");
  }, [user]);*/

  useEffect(() => {
    document?.addEventListener("keydown", keyDown);
  }, []);


  return (
    <>
      <div className="w-screen fixed h-full top-0 left-0 md:grid z-30 grid-cols-5">
        <div className="w-full h-full col-span-3 relative flex items-center justify-center">
          <div className="flex flex-col items-center gap-4 w-full px-10 md:px-0 sm:w-3/4 md:w-2/3">
            <div className="flex flex-col gap-2 items-center justify-center w-full">
              <LogoFullColor className="w-auto h-10" />
            </div>
            {Stages[stage]}
          </div>
        </div>
        <div className="hidden md:block banner w-full h-full col-span-2 " />
      </div>
      <style >
        {`
          .banner {
            background-image: url("/banner-login.webp");
            background-size: cover;
            background-position: top;
          }
        `}
      </style>
    </>
  );
};

export default PageLogin;
