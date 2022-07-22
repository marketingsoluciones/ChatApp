import { FC } from "react";


interface propsBoxChat {
  active: boolean
}
const BoxChatIni: FC<propsBoxChat> = ({ active }) => {
  return (
    <>
      <div className={`bg-red lg:flex col-span-12 lg:col-span-6 bg-base w-full h-full  flex flex-col  justify-between border-gray-100`}>
        <div className="text-center p-24">
          Bienvenido!!! Ahora puedes enviar y recibir mensajes
        </div>
      </div>
    </>
  );
};

export default BoxChatIni;
