import { FC, MouseEventHandler } from "react";
import { Item } from './Item'


interface propsSection {
  image: any
  name: String
  info: String
  _id: String
  onClick: MouseEventHandler
  onLine?: boolean

}



export const Section: FC<propsSection> = ({ image, onClick, name, info, _id, onLine }) => {
  return (
    <>
      <div className="w-full overflow-y-hidden gap-10 pl-2 pr-2 truncate pt-2"   >
        <button onClick={onClick} className="w-full text-left flex">
          <Item image={image} name={name} info={info} _id={_id} onLine={ onLine} />
        </button>

      </div>
    </>
  );
};

