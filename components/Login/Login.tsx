import { FC, useState } from "react";
import { LogoFullColor } from "../Icons";
import { Providers } from "./Components";
import FormLogin from "./Forms/FormLogin";
import FormResetPassword from "./Forms/FormResetPassword"


interface propsLogin {
  setStage: CallableFunction;
}
export const Login: FC<propsLogin> = ({ setStage }) => {
  return (
    <>

      <Providers setStage={setStage} />
      <FormLogin setStage={setStage} />
      {/* <RegisterQuestion onClick={() => setStage("register")} /> */}
      {/* <BusinessAccess /> */} {/* componente que no esta terminado */}
    </>
  );
};


