import { FC } from "react";
import { LogoFullColor } from "../../Icons";
import FormResetPassword from "./FormResetPassword";

interface propsResetPass {
  setStage: CallableFunction;
}

export const ResetPass: FC<propsResetPass> = ({ setStage }) => {
  return (
    <>
      <FormResetPassword setStage={setStage} />
      <h2
        className={`font-light text-gray100  flex gap-2 items-center text-sm `}
      >
        ¿Dispones de una cuenta?
        <span
          className="text-sm text-primary font-semibold cursor-pointer  transition"
          onClick={() => setStage("login")}
        >
          Inicia Sesión
        </span>
      </h2>
      {/* <BusinessAccess /> */} {/* componente que no esta terminado */}
    </>
  );
};
