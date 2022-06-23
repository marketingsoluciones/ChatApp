import { FC } from "react";
import Button from '../Button'
import Image from 'next/image'
import Logo from '../../public/logo.png'
import { Notification } from '../Notification'
import { Profile } from "../Profile"


export const Navigation: FC = () => (
  <>
    <div className="h-16 w-full" />
    <div className="bg-white h-16 w-full shadow-md fixed top-0 z-30">
      <nav className="flex justify-between items-center xl:max-w-screen-xl lg:max-w-screen-lg md:max-w-screen-md px-5 md:px-0 w-full mx-auto inset-x-0 h-full">
        <Image
          alt="Logo-BodasDeHoy"
          src={Logo}
          className="object-contain"
          width={160}
          height={100}
        />
        <div className="flex items-center gap-4 h-full">
          <Button title={"Invita amigos"} onClick={() => console.log("Hola mundo")} className="hidden md:block bg-primary text-white px-3 py-2 rounded-lg text-sm transition hover:opacity-90" />
          <Notification />
          <Profile />
        </div>
      </nav>
    </div>
  </>
);

