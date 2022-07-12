import { FC } from "react";
import {Item} from './Item'


interface propsSection {
  image: any
  name: String
  info: String
}

export const Section: FC<propsSection> = ({image , name, info} ) => {
  return (
    <>
      <div className="w-full overflow-y-hidden  gap-10 pl-5 truncate pt-3   ">
        <Item image={image} name={name} info={info}/>
      </div>
    </>
  );
};