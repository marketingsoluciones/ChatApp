import { FC } from "react";
import Image from 'next/image'

interface propsImgPerfilContacto {
  image: any | undefined | null
  name: String
  onLine?: boolean
}



export const ImgPerfilContacto: FC<propsImgPerfilContacto> = ({ image, name, onLine }) => (
  <>
    <span className="">
      <div className=" ">
        {
          image ?
            <Image src={image} alt="avatar" width={105} height={105} className="bg-tertiary w-28 h-28 rounded-full" />
            :
            <p className="bg-red rounded-full w-28 h-28 text-center content-center " style={{fontSize:'40px', paddingTop:'26px'}}>{name?.split(" ")[0]?.slice(0, 1)?.toUpperCase()}{name?.split(" ")[1]?.slice(0, 1)?.toUpperCase()}</p>
        }
      </div>
      {/* {onLine && <svg className="bg-green rounded-full w-3 h-3 absolute bottom-1 right-1 border border-white" />} */}
    </span>
  </>
);

export default ImgPerfilContacto