import { FC } from "react";
import Conversation from "./Conversation";
import { HeaderChat } from "./HeaderChat";
import { SendMessage } from "./SendMessage";

interface propsBoxChat {
  active: boolean
  chat?: any
  setChat: any
}
const BoxChat: FC<propsBoxChat> = ({ active, chat, setChat }) => {
  //${active ? "" : "hidden"} 
  return (
    <>
      <div className={`${active ? "" : "hidden"} bg-red lg:flex col-span-12 lg:col-span-6 bg-base w-full h-full flex flex-col  justify-between border-gray-100 border-r`}>
        <div className="bg-green h-20">
          <HeaderChat chat={chat} />
        </div>
        <div className="calHeight4 bg-base ">
          <Conversation chat={chat} />
        </div>
        <SendMessage chat={chat} setChat={setChat} />
      </div>
      <style>
        {`
      // .chats {
      //   height: calc(100vh - 4rem);
      // }
      .calHeight4 {
            height: calc(100vh - 12rem - 1rem / 3);
            overflow: scroll;
            //background: #f0f0f0;
          }
      `}
      </style>
    </>
  );
};

export default BoxChat;




