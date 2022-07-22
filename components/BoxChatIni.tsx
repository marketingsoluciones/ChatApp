import { FC } from "react";
import { LogoBoda } from "./LogoBoda";


interface propsBoxChat {
  active: boolean
}
const BoxChatIni: FC<propsBoxChat> = ({ active }) => {
  return (
    <>
      <div className={`bg-white lg:flex col-span-12 lg:col-span-6 bg-base w-full h-full flex flex-col justify-between border-l-2 border-gray-100`}>
        <div className="text-center p-24">
          <LogoBoda width={160} height={100} />
          <p className="text-center">
            Bienvenido!!! Ahora puedes enviar y recibir mensajes
          </p>
        </div>
      </div>
    </>
  );
};

export default BoxChatIni;
