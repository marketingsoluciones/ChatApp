import {  UserIcon  } from "../components/Icons/";
import Link from "next/link";
import { FC, MouseEventHandler, useState } from "react";
import { AuthContextProvider } from "../context";
import { useAuthentication } from "../utils/Authentication";
import ClickAwayListener from 'react-click-away-listener'

export const Profile: FC = () => {
  const {user}  = AuthContextProvider()
  const [show, setShow] = useState (false)
  return (
    <>
      <div onClick={()=>setShow(!show)} className=" flex items-center gap-2 cursor-pointer ">
        <img src= {user?.photoURL?user?.photoURL:"error"}  alt="perfil" className="rounded-full  w-10 h-10 object-cover object-center" /> 
        <span  className="hidden md:block flex flex-col gap-1 text-left">
          <h2  className=" truncate font-medium leading-tight text-sm text-black">
            {user?.displayName}
          </h2>
          <p className="truncate font-regular leading-tight text-xs text-gray-700">
            {user?.role}
          </p>
        </span>
      </div>
      <ClickAwayListener onClickAway={()=> show && setShow(false)}>
      <span className={`${show?"  block absolute right-5 top-20 md:right-56":"hidden"}`}>
          <ProfileMenu />
      </span>
      </ClickAwayListener>
    </>
  )
};

const ProfileMenu = () => {
  const { _signOut } = useAuthentication()
  return (
    <>
      <div className={`w-40 h-20 rounded-md h-max  bg-white shadow-md absolute right-2 inset-y-full overflow-hidden z-50 `}>
        <div className=" grid gap-2 text-xs place-items-center p-2 ">
          <span className="flex gap-2">
            <img src="/logout.png" alt="salir" className="w-6 h-6"/>
            <button onClick={async()=>{_signOut()}}>cerrar sesion</button>
          </span>
          <span >
            <Link href={"/configuracion"}>
              <a className="flex gap-2 place-items-center">
                <UserIcon/>
                perfil
              </a>
            </Link>
          </span>
        </div>
      </div>
    </>
  );
};

