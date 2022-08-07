import { FC, memo } from "react";
import Image from 'next/image'
import { CircleImage } from './CircleImg'


interface propsItem {
  image: any | undefined | null
  name: String
  info: any
  _id: String
  onLine?: boolean
}

export const Item: FC<propsItem> = memo(({ image, name, info, _id, onLine }) => {
  return (
    <div
      className="flex  items-center justify-center w-full gap-2 cursor-pointer py-1"
    >
      <CircleImage image={image} name={name} onLine={onLine} />
      <span className="w-full truncate">
        <h3 className="text-gray-700 text-sm">{name}</h3>
        <p className="font-regular text-gray-500 text-xs w-full truncate">{info}</p>
      </span>
    </div>
  );
});