import { FC, ReactNode } from "react";
import useHover from "../../hooks/useHover";
import { DotsIcon, DownloadIcon, UploadIcon } from "../icons";

interface propsText {
  message?: string;
  date?: Date;
  emisor?: boolean;
}
const ComponentText: FC<propsText> = ({ message, date, emisor }) => {
  return (
    <>
      <p className={`${emisor ? "text-white" : "text-gray-200"} text-sm`}>
        Hola mundo
      </p>
      <p className="text-gray-200 text-xs absolute bottom-0 left-0 transform translate-y-full -mb-2">
        Hace 12 min
      </p>
    </>
  );
};

interface propsFile {
  emisor: boolean;
}
const ComponentFile: FC<propsFile> = ({ emisor }) => {

  interface propsIcon {
    icon: ReactNode,
    title: string
  }
  const Icon : FC <propsIcon> = ({icon, title}) => {
    const [hoverRef, isHovered] = useHover();
    return (
      <div ref={hoverRef} className="rounded-full border border-gray-100 w-8 h-8 p-1 flex items-center justify-center text-gray-200 bg-white cursor-pointer relative">
        {isHovered && (
        <div className="absolute transform mb-6 -translate-y-full bg-black w-max h-max text-white opacity-70 visibility-none px-2 py-1 rounded-lg ">
          <p className="text-white font-medium text-xs text-center">
            {title}
          </p>
        </div>
      )}
        {icon}
      </div>
    )
  }
  return (
    <>
      <div className="flex gap-10 w-full">
        <div className="flex gap-4">
        <div className="file w-10 h-10" />
        <span className={emisor ? "text-white" : "text-gray-200"}>
          <p className="text-sm ">FileImage.jpg</p>
          <p className="text-xs">2 mb</p>
        </span>
        </div>
        <div className="flex gap-3 items-center">
          <Icon icon={<DownloadIcon/>} title="Descargar"/>
          <Icon icon={<UploadIcon/>} title="Compartir"/>
        </div>
      </div>
      <style jsx>
        {`
          .file {
            background-image: url("/file.svg");
            background-size: contain;
            background-repeat: no-repeat;
            background-position: center;
          }
        `}
      </style>
    </>
  );
};

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
  emisor?: boolean;
  type: keyof typeof types;
}

export const Message: FC<propsMessage> = ({ emisor = true, type }) => {
  types = {
    text: <ComponentText emisor={emisor} />,
    file: <ComponentFile emisor={emisor} />,
  };
  return (
    <div
      className={`flex gap-4 items-center ${emisor ? "flex-row-reverse" : ""}`}
    >
      <div className="bg-tertiary w-12 h-12 rounded-full" />
      <div
        className={`${
          emisor ? "bg-primary" : "bg-white"
        } w-max p-3 rounded-lg shadow-md relative`}
      >
        <DotsIcon
          className={`h-4 absolute rotate-90 transform text-gray-200 ${
            emisor
              ? "-translate-x-full -ml-2 left-0 inset-y-0 my-auto"
              : "translate-x-full -mr-2  right-0 inset-y-0 my-auto"
          }`}
        />
        {types[type]}
      </div>
    </div>
  );
};
