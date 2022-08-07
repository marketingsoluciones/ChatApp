import { FC, memo } from "react";
import Image from 'next/image'
import { CircleImage } from './CircleImg'
import { SearchIcon } from "./icons";

export const Buscador: FC = (props) => {
  return (
    <span className="relative w-full pl-1 pr-1 pt-1">
      <input
        placeholder="Search for messages or users..."
        type="text"
        className="focus:outline-none bg-white rounded shadow-sm px-4 py-1 w-full text-sm focus:ring transition truncate"
        {...props}
      />
      <SearchIcon className="w-4 h-4 absolute inset-y-0 my-auto right-3 text-gray-700 opacity-60 h-max" />
    </span>
  );
};