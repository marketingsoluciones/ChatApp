import { FC, ReactNode, useState } from "react";
import Conversation from "./Conversation";
import { CameraIcon, MicIcon, PlusIcon, SendIcon } from "./icons";
import Image from 'next/image'
import Profile from '../assets/img/profile.png'

interface propsBoxChat {
  active : boolean
}
const BoxChat: FC <propsBoxChat>= ({active}) => {
  return (
    <>
    <div className={`${active ? "" : "hidden"} lg:flex col-span-12 lg:col-span-6 chats bg-base w-full h-full  flex flex-col gap-3 justify-between xl:border-l xl:border-r border-gray-100 p-6`}>
      <HeaderChat />
      <Conversation />
      <SendMessage />
    </div>
    <style>
      {`
      .chats {
        height: calc(100vh - 4rem);
      }
      `}
    </style>
    </>
  );
};

export default BoxChat;

const HeaderChat = () => {
  return (
    <div className="bg-white w-full h-20 p-8 rounded-lg flex items-center justify-between">
      <div className="flex gap-4 items-center ">
        <div className="relative">
          <Image
            alt="Perfil"
            src={Profile} 
            width={48}
            height={48}
            className="rounded-full col-span-1"
          />
          <svg className="bg-green w-3 h-3 rounded-full absolute top-0 right-0 border-2 border-white" />
        </div>
        <div>
          <h3 className="font-semibold text-gray-300 text-sm">Jhon Travolta</h3>
          <p className="font-regular text-gray-200 text-xs w-full truncate">
            Online
          </p>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <CameraIcon className="w-7 h-7 text-gray-200 cursor-pointer" />
        <MicIcon className="w-7 h-7 text-gray-200 cursor-pointer" />
      </div>
    </div>
  );
};


export const SendMessage = () => {
  const [show, setShow] = useState(false);

  const Options: FC = () => {
    interface propsCircle {
      icon: ReactNode;
    }
    const Circle: FC<propsCircle> = ({ icon }) => {
      return <div className="bg-white rounded-full p-1 w-12 h-12 shadow flex items-center justify-center hover:bg-primary hover:text-white transition ease-in duration-200 cursor-pointer">{icon}</div>;
    };
    return (
      <div className="flex items-center justify-center relative">
        <PlusIcon className="text-gray-100 w-7 h-7 cursor-pointer" onClick={() => setShow(!show)} />
          <div className={`flex flex-col gap-4 absolute top-0 -mt-6 transform	-translate-y-full ${show ? "opacity-100" : "opacity-0"}`}>
            <Circle icon={<CameraIcon />} />
            <Circle icon={<MicIcon />} />
          </div>
      </div>
    );
  };
  return (
    <div className="h-max w-full bg-white rounded-lg p-2 px-4 flex gap-4 items-center justify-between">
      <div>
        <Options />
      </div>

      <input
        placeholder="Type your message ..."
        className="text-sm focus:ring transition rounded-md py-2 px-2 w-full h-full focus:outline-none"
        autoFocus
      />
      <div className="text-gray-200 hover:text-primary cursor-pointer hover:opacity-90 transition">
        <SendIcon className="w-5 h-5" />
      </div>
    </div>
  );
};
