import Image from "next/image";
import { FC } from "react";
import Logo from '../public/logo.png'

interface propsLedIndicator {
  width?: number
  height: number
}




export const LogoBoda: FC<propsLedIndicator> = ({ width, height }) =>
  <>
    <Image
      alt="Logo-BodasDeHoy"
      src={Logo}
      className="object-contain"
      width={width}
      height={height}
    />
  </>
  ;
