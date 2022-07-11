import { FC } from "react";
import Image from 'next/image'

interface propsCircleImage {
    image: any | undefined | null
    name: string
  }
  
  export const CircleImage: FC<propsCircleImage> = ({ image, name }) => (
    <>
      <span className="relative">
        <Image src={image} alt={name} width={48} height={48} objectFit={"contain"} className="rounded-full" />
        <svg className="bg-green rounded-full w-3 h-3 absolute bottom-1 right-1 border-2 border-white" />
      </span>
    </>
  );