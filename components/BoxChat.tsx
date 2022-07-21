import { FC } from "react";
import Conversation from "./Conversation";
import { HeaderChat } from "./HeaderChat";
import { SendMessage } from "./SendMessage";

interface propsBoxChat {
  active: boolean
  chat?: any
}
const BoxChat: FC<propsBoxChat> = ({ active, chat }) => {

  return (
    <>
      <div className={`${active ? "" : "hidden"} lg:flex col-span-12 lg:col-span-6 chats bg-base w-full h-full  flex flex-col gap-3 justify-between xl:border-l xl:border-r border-gray-100`}>
        <HeaderChat chat={chat} />
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




