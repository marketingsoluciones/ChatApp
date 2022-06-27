import React, { FC, useReducer } from "react";
import { DotsIcon, FileIcon } from "./icons";
import { AuthContextProvider } from '../context';

interface propsContact {
  active: boolean
}
const ContactInfo : FC <propsContact> = ({active}) => {
  
  return (
    <>
      <div className={`lg:flex col-span-12 lg:col-span-3 w-full chats p-6 gap-4 flex flex-col items-center justify-start overflow-auto ${active ? "" : "hidden"} `}>
        <Profile />
        <Information />
        <SharedFiles />
      </div>
      <style jsx>
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

const Profile = () => {
  const {user} = AuthContextProvider()
  return (
    <div className="bg-white h-max w-full rounded-lg p-10 flex flex-col items-center justify-center">
      <div className="bg-tertiary w-28 h-28 rounded-full" />
      {/* <img src={user?.photoURL?user?.photoURL:"error"} alt="" className="bg-tertiary w-28 h-28 rounded-full" /> */}
      
      <h2 className="text-md font-semibold text-gray-300 pt-3">
        {user?.displayName}
      </h2>
      <p className="text-sm text-gray-200 leading-4">{user?.role}</p>
    </div>
  );
};

const Information = () => {
  const {user} = AuthContextProvider()
  interface propsInfo {
    title: string;
    contain: string;
    border?: boolean;
  }

  const Info: FC<propsInfo> = ({ title, contain, border = true }) => {
    
    return (
      <div
        className={`flex flex-col items-start justify-center py-2 ${
          border ? "border-b border-base" : ""
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
      <Info title="Pais" contain={user?.country?user.country:"error"} />
      <Info title="Phone" contain="yo lo quitaria" />
      <Info
        title="Correo electronico"
        contain={user?.email?user?.email:"error"}
        border={false}
      />
    </div>
  );
};

const SharedFiles : FC = () => {

    interface propsUploadFile {
        titleFile: string,
        sizeFile: string,
        extensionFile: string
    }

  const UploadedFile : FC <propsUploadFile> = ({titleFile, sizeFile, extensionFile}) => {
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
        <style jsx>
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
