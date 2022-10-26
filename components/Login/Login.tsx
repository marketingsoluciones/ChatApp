import { FC, useState } from "react";
import { LogoFullColor } from "../Icons/";
import { Providers } from "./Components";
import FormLogin from "./Forms/FormLogin";
import FormResetPassword from "./Forms/FormResetPassword"


interface propsLogin {
  setStage: CallableFunction;
}
export const Login: FC<propsLogin> = ({ setStage }) => {
  return (
    <>
    

    
      <div className="flex flex-col pt-6  items-center justify-center w-full">
        <LogoFullColor className="w-auto h-10" />
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


