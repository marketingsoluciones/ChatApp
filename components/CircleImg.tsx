import { FC } from "react";
import Image from 'next/image'

interface propsCircleImage {
  image: any | undefined | null
  name: String
}

export const CircleImage: FC<propsCircleImage> = ({ image, name }) => (
  <>
    <span className="relative">
      {
        image ?
          <Image src={image} alt="avatar" width={48} height={48} objectFit={"contain"} className="rounded-full" />
          :
          <p className="bg-green rounded-full w-10 h-10 p-2 text-center">{name?.split(" ")[0]?.slice(0, 1)?.toUpperCase()}{name?.split(" ")[1]?.slice(0, 1)?.toUpperCase()}</p>
      }
      <svg className="bg-green rounded-full w-3 h-3 absolute bottom-1 right-1 border-2 border-white" />
    </span>
  </>
);

/* alt={name} */