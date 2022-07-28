import React, { FC, useReducer } from "react";
import { DotsIcon, FileIcon } from "./icons";
import { AuthContextProvider } from '../context';
import { Section } from '../components/Section';
import { getRelativeTime } from "../utils/FormatTime";
import SectionContact from '../components/DatosContacto/SectionContact'

interface propsContact {
  active: boolean
  chat?: any
}
const ContactInfo: FC<propsContact> = ({ active, chat }) => {

  return (
    <>
      <div className={`${active ? "" : "hidden"} lg:flex col-span-12 lg:col-span-3 w-full chats p-6 gap-4 flex flex-col items-center justify-start overflow-auto `}>
        <Profile chat={chat} />
        <Information chat={chat} />
        <SharedFiles />
      </div>
      <style >
        {`
      .chats {
        height: calc(100vh - 4rem);
      }
      ::-webkit-scrollbar {
        display: none;
    `}
      </style>
    </>
  );
};

export default ContactInfo;

const Profile: FC<any> = ({ chat }) => {
  return (
    <div className="bg-white h-max w-full rounded-lg  flex flex-col items-center justify-center">
      <SectionContact key={chat?._id} onClick={() => { }} image={chat?.photoURL} name={chat?.title} info={chat?.onLine?.status ?? chat?._id ? "Online" : chat?.onLine?.status != undefined ? getRelativeTime(chat?.onLine?.dateConection) : <br />} _id={chat?._id} />
    </div>
  );
};

const Information: FC<any> = ({ chat }) => {
  const { user } = AuthContextProvider()

  interface propsInfo {
    title: string;
    contain: string;
    border?: boolean;

  }

  const Info: FC<propsInfo> = ({ title, contain, border = true, }) => {

    return (
      <div
        className={`flex flex-col items-start justify-center py-2 ${border ? "border-b border-base" : ""
          }`}
      >
        <h3 className="text-sm text-gray-300">{title}</h3>
        <p className="text-sm text-gray-200">{contain}</p>
      </div>
    );
  };
  return (

    <div className="bg-white h-max w-full rounded-lg p-4">
      <h2 className="text-gray-200 text-md pb-2">Informacion personal</h2>
      {/* <Info title="Pais" contain={user?.country ? user.country : "error"} /> */}
      {/* <Info title="Phone" contain="yo lo quitaria" /> */}
      <Info
        key={chat?._id}
        title="Correo electronico"
        contain={chat?.email}
        border={false}
      />
    </div>
  );
};

const SharedFiles: FC = () => {

  interface propsUploadFile {
    titleFile: string,
    sizeFile: string,
    extensionFile: string
  }

  const UploadedFile: FC<propsUploadFile> = ({ titleFile, sizeFile, extensionFile }) => {
    return (
      <>
        <div className="py-4 px-2 w-full relative flex justify-between">
          <div className="relative flex gap-4 items-center">
            <div className="w-12 file h-12" />
            <span className="flex flex-col gap-1">
              <p className="text-sm text-gray-300">{titleFile}</p>
              <p className="text-sm text-gray-200">{sizeFile}</p>
            </span>
          </div>
          <DotsIcon className="w-4 w-4 transform rotate-90" />

        </div>
        <style >
          {`
                    .file {
                        background-image: url("/file.svg");
                        background-size: contain;
                        background-repeat: no-repeat;
                        background-position: center
                    }

                    .file::before {
                        content: "Look at this orange box.",
                        position:absolute,
                        top :0,
                        left:0,
                        right: 0,
                        bottom: 0,
                        margin:auto;
                        color: white;
                        font-size: 2rem
                    }
                    `}
        </style>
      </>
    );
  };
  return (
    <div className="bg-white h-max w-full rounded-lg p-4 h-96">
      <h2 className="text-gray-200 text-md pb-2">Archivos compartidos</h2>
      <UploadedFile titleFile={"Imagen Prueba"} sizeFile="2 mb" extensionFile={".jpg"} />
    </div>
  );
};
