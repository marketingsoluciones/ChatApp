import { FC, ReactNode } from "react";
import { DotsIcon } from "../icons";
import { MessageFile } from "../MessageFile";
import { MessageText } from "../MessageText";

// Definir tipos de datos
type tipos = {
  text: ReactNode;
  file: ReactNode;
};

//Definir tipos posibles
let types: tipos = {
  text: undefined,
  file: undefined,
};

//Definir interfaz de props
interface propsMessage {
  message: string;
  date: string;
  emisor?: boolean;
  type: keyof typeof types;
}

export const Message: FC<propsMessage> = ({ message, date, emisor = true, type }) => {
  types = {
    text: <MessageText emisor={emisor} date={date} message={message} />,
    file: <MessageFile emisor={emisor} />,
  };
  return (
    <>
      <div 
        className={`flex gap-4 items-center ${emisor ? "flex-row-reverse" : ""} p-px`}
      >
        <div className={`${emisor ? "bg-rose" : "bg-white"} rounded-xl shadow-md `}>
          {types[type]}
          {/* {<DotsIcon
            className={`h-4 absolute rotate-90 transform text-gray-200 ${emisor
              ? "-translate-x-full -ml-2 left-0 inset-y-0 my-auto"
              : "translate-x-full -mr-2  right-0 inset-y-0 my-auto"
              }`}
          />} */}
        </div>
      </div>
    </>
  );
};
