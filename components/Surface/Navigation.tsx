import { FC, useState, MouseEventHandler, useEffect } from "react";
import Button from '../Button'
import Image from 'next/image'
import Logo from '../../public/logo.png'
import { Notification } from '../Notification'
import { Profile } from "../Profile"



export const Navigation: FC = () => {
  const [valir, setValir] = useState<boolean>(false);
  const [value, setValue] = useState<number>(0);


  const handleClickNotification: MouseEventHandler = () => {
    setValir(false)
    setValue(0)
    console.warn("desplegar notificaciones")
  }
  const handleInviteFriend: MouseEventHandler = () => {
    console.log("click invitacion")
    setValue(value + 1)
  }
  useEffect(() => {
    if (value > 0) setValir(true)
  }, [value])


  return (
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
            <Button title={"Invita amigos"} onClick={handleInviteFriend} className="md:block bg-primary text-white px-3 py-2 rounded-lg text-sm transition hover:opacity-90" />
            <Notification valir={valir} value={value} onClick={handleClickNotification} />
            <Profile />
          </div>
        </nav>
      </div>
    </>
  )
};

