
import { FC, MouseEventHandler, useState } from "react";
import { AuthContextProvider } from "../context";
import { useAuthentication } from "../utils/Authentication";
import {UserIcon} from "../components/Icons/index"
import image from "next/image";

export const Profile: FC = () => {
  const {user}  = AuthContextProvider()
  const [show, setShow] = useState (false)
  return (
    <>
      <div onClick={()=>setShow(!show)} className=" flex items-center gap-2 cursor-pointer ">
        <img src= {user?.photoURL?user?.photoURL:"error"}  alt="perfil" className="rounded-full  w-10 h-10 object-cover object-center" /> 
        <span  className="flex flex-col gap-1 text-left">
          <h2  className="truncate font-medium leading-tight text-sm text-black">
            {user?.displayName}
          </h2>
          <p className="truncate font-regular leading-tight text-xs text-gray-200">
            {user?.role}
          </p>
        </span>
      </div>
      <span className={`${show?"block absolute right-5 top-16":"hidden"}`}>
          <ProfileMenu />
      </span>
    </>
  )
};

const ProfileMenu = () => {
  const { _signOut } = useAuthentication()
  return (
    <>
      <div className={`w-40 h-10 rounded-xl h-max bg-white shadow-md absolute  right-2 inset-y-full overflow-hidden z-50  }`}>
        <div className=" flex text-xs gap-2 justify-center pt-2 ">
          <UserIcon/>
          <button onClick={async()=>{_signOut()}}>cerrar sesion</button>
        </div>
      </div>
    </>
  );
};

