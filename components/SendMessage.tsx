import { FC, ReactNode, useState } from "react";
import { CameraIcon, MicIcon, PlusIcon, SendIcon } from "./icons";


export const SendMessage = () => {

  return (
    <div className="h-max w-full bg-white p-2 px-4 flex gap-4 items-center justify-between">
      <div>
        <Options />
      </div>

      <input
        placeholder="Type your message ..."
        className="text-sm focus:ring transition rounded-md py-2 px-2 w-full h-full "
        autoFocus
      />
      <div className="text-gray-200 hover:text-primary cursor-pointer hover:opacity-90 transition">
        <SendIcon className="w-5 h-5" />
      </div>
    </div>
  );
};

const Options: FC = () => {
  const [show, setShow] = useState(false);
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


interface propsCircle {
  icon: ReactNode;
}

const Circle: FC<propsCircle> = ({ icon }) => {
  return <div className="bg-red rounded-full p-1 w-12 h-12 shadow flex items-center justify-center hover:bg-primary hover:text-white transition ease-in duration-200 cursor-pointer">{icon}</div>;
};