import { FC, ReactNode, useState } from "react";
import { ChatContextProvider, SocketContextProvider } from "../context";
import { HandleSendMessage } from "../handles";
import { SendIcon } from "./icons";
import { OptionsSendMessage } from "./OptionsSenMessage";

interface propsSendMessage {
  chat: any
  setChat: any
  user: any
}

export const SendMessage: FC<propsSendMessage> = ({ chat, setChat, user }) => {
  const { socket } = SocketContextProvider();

  const { setChats, contacts } = ChatContextProvider()
  const [value, setValue]: any = useState("")
  return (
    <div className="h-max w-full bg-white p-2 px-4 flex gap-4 items-center justify-between">
      <div>
        <OptionsSendMessage />
      </div>
      <input
        placeholder="Type your message ..."
        className="text-sm focus:ring transition rounded-md py-2 px-2 w-full h-full "
        autoFocus
        onChange={(e) => { setValue(e.target.value) }}
        value={value}
      />
      <div className="text-gray-200 hover:text-primary cursor-pointer hover:opacity-90 transition button" onClick={() => {
        value != "" && HandleSendMessage({ chat, messageSend: value, userUid: user?.uid ?? "", setChats, setChat, socket }), setValue("")
      }}>
        <SendIcon className="w-5 h-5" />
      </div>
    </div>
  );
}
