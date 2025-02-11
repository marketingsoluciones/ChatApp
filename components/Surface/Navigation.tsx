import { FC, useState, MouseEventHandler, useEffect } from "react";
import { Notification } from '../Notification'
import { Profile } from "../Profile"
import { AuthContextProvider } from "../../context";
import Head from "next/head";

export const Navigation: FC = () => {
  const { config } = AuthContextProvider()
  const [valir, setValir] = useState<boolean>(false);
  const [value, setValue] = useState<number>(0);

  const handleClickNotification: MouseEventHandler = () => {
    setValir(false)
    setValue(0)
  }
  const handleInviteFriend: MouseEventHandler = () => {
    setValue(value + 1)
  }
  useEffect(() => {
    if (value > 0) setValir(true)
  }, [value])

  return (
    <>
      <div className="h-16 w-full " />
      <div className="h-16 w-full shadow-md top-0 bg-white z-100 absolute">
        <nav className="flex justify-between items-center xl:max-w-screen-xl lg:max-w-screen-lg md:max-w-screen-md px-5 md:px-0 w-full mx-auto inset-x-0 h-full conte">
          <div className=" w-80 h-10">
            {config?.logoDirectory}
          </div>
          <div className="flex items-center justify-between md:gap-4 h-full">
            {/* <Button title={"Invita amigos"} onClick={handleInviteFriend} className="hidden md:block bg-primary text-white px-3 py-2 rounded-lg text-sm transition hover:opacity-90" /> */}
            <Notification valir={valir} value={value} onClick={handleClickNotification} />
            <Profile />
          </div>
        </nav>
      </div>
    </>
  )
};

