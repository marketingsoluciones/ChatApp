import { FC, useState } from "react";
import { Providers } from "./Components";
import FormLogin from "./Forms/FormLogin";
import { AuthContextProvider } from "../../context";

interface propsLogin {
  setStage: CallableFunction;
}

export const Login: FC<propsLogin> = ({ setStage }) => {
  const { config } = AuthContextProvider()
  return (
    <>
      <div className="flex flex-col pt-6 items-center justify-center w-1/2 h-30">
        {config?.logoDirectory}
      </div>
      <h2 className={`font-light text-tertiary flex items-center text-md `}>
        Accede a tu cuenta
      </h2>
      <Providers setStage={setStage} />
      <h2 className={`font-light text-tertiary flex gap-2 items-center text-md `}>
        O accede con tu email
      </h2>
      <FormLogin setStage={setStage} />
      {/* <RegisterQuestion onClick={() => setStage("register")} /> */}
      {/* <BusinessAccess /> */} {/* componente que no esta terminado */}
    </>
  );
};


