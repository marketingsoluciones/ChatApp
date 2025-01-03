import { FC } from "react";
import { AuthContextProvider } from "../context";


interface propsBoxChat {
  active: boolean
}
const BoxChatIni: FC<propsBoxChat> = ({ active }) => {
  const { config } = AuthContextProvider()
  return (
    <>
      <div className={`bg-white  medium lg:flex col-span-12 lg:col-span-9 bg-base w-full h-full flex flex-col justify-between border-l-2 border-gray-100`}>
        <div className="text-center flex flex-col items-center space-y-10 justify-center flex-1">
          <div className="w-80 h-30">
            {config?.logoDirectory}
          </div>
          <p className="text-center">
            Bienvenido!!! Ahora puedes enviar y recibir mensajes
          </p>
        </div>
      </div>
      <style jsx>{`
      @media screen and (max-width: 700px){
        .medium {
          display: none;
        }
      }       
      `}</style>
    </>
  );
};

export default BoxChatIni;
