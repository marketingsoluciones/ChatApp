import { FC } from "react";


interface propsBoxChat {
  active: boolean
}
const BoxChatIni: FC<propsBoxChat> = ({ active }) => {
  return (
    <>
      Bienvenido!!! Ahora puedes enviar y recibir mensajes
    </>
  );
};

export default BoxChatIni;
