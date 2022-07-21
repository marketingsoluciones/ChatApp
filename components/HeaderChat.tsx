import { FC } from "react";
import { CameraIcon, MicIcon } from "./icons";
import { Section } from "./Section";

export const HeaderChat: FC<any> = ({ chat }) => {

  return (
    <div className="bg-white w-full h-20 p-6 rounded-lg flex items-center justify-between">
      <Section key={chat?._id} onClick={() => { }} image={chat?.photoURL} name={chat?.title} info={"Online "} _id={chat?._id} />
      <div className="flex items-center gap-4">
        <CameraIcon className="w-7 h-7 text-gray-200 cursor-pointer" />
        <MicIcon className="w-7 h-7 text-gray-200 cursor-pointer" />
      </div>
    </div>
  );
};