import { FC } from "react";
import { AuthContextProvider } from "../context";
import Conversation from "./Conversation";
import { HeaderChat } from "./HeaderChat";
import { SendMessage } from "./SendMessage";

interface propsBoxChat {
  active: boolean
  chat?: any
  setChat: any
}
const BoxChat: FC<propsBoxChat> = ({ active, chat, setChat }) => {
  const { user } = AuthContextProvider()
  //${active ? "" : "hidden"} 
  return (
    <>
      <div className={`${active ? "" : "hidden"} bg-gray-100 lg:flex col-span-12 lg:col-span-9 bg-base w-full h-full flex flex-col  justify-between border-gray-100 border-r`}>
        <div className="h-20">
          <HeaderChat chat={chat} />
        </div>
        <div className="calHeight4 bg-base pt-2">
          <Conversation chat={chat} user={user} />
        </div>
        <SendMessage chat={chat} setChat={setChat} user={user} />
      </div>
      <style jsx>
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




