import { FC , memo} from "react";
import Image from 'next/image'
import {CircleImage} from './CircleImg'


interface propsItem {
    image: any | undefined | null
    name: String
    info: String
    _id: String
  }
  
 export const Item : FC<propsItem> = memo (({ image, name, info , _id}) => {
    return (
      <div
        className="flex  items-center justify-center w-full gap-2 cursor-pointer py-1"
      >
        <CircleImage image={image } name={name}/>
        <span className="w-full truncate">
          <h3 className="font-semibold text-gray-300 text-sm">{name}</h3>
          <p className="font-regular text-gray-200 text-xs w-full truncate">{info}</p>
        </span>
      </div>
    );
  });