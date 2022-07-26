import { FC, MouseEventHandler } from "react";
import PerfilContacto from './PerfilContacto'


interface propsSection {
  image: any
  name: String
  info: any
  _id: String
  onClick: MouseEventHandler
  onLine?: boolean

}



const SectionContact: FC<propsSection> = ({ image, onClick, name, info, _id, onLine }) => {
  return (
    <>
      <div className="w-full overflow-y-hidden gap-10 pl-2 pr-2 truncate pt-2"   >
        
          <PerfilContacto image={image} name={name} info={info} _id={_id} onLine={onLine} />
        

      </div>
    </>
  );
};

export default SectionContact