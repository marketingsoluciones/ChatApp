import { FC } from "react";
import { CameraIcon, MicIcon } from "./icons";
import { Section } from "./Section";

export const HeaderChat: FC<any> = ({ chat }) => {

  return (
    <div className="bg-white w-full h-20 flex items-center justify-between">
      <div className="pb-2">
        <Section key={chat?._id} onClick={() => { }} image={chat?.photoURL} name={chat?.title} info={"Online "} _id={chat?._id} />
      </div>
      <div className="flex items-center p-2 gap-2">
        <CameraIcon className=" w-7 h-7 text-gray-200 cursor-pointer" />
        <MicIcon className="w-7 h-7 text-gray-200 cursor-pointer" />
      </div>
    </div>
  );
};