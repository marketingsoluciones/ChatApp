import { FC, MouseEventHandler } from "react";
import { BellIcon } from "./icons";
import { LedIndicator } from "./LedIndicator"
import { useState } from "react"
import ClickAwayListener from 'react-click-away-listener'

interface propsNotication {
  valir?: boolean;
  value?: number | undefined | null
  onClick: MouseEventHandler<HTMLDivElement> | undefined
}

export const Notification: FC<propsNotication> = ({ valir, value, onClick }) => {
  const [show, setShow] = useState(false)
  console.log(show)
  return (
    <>
      <div className="flex items-center px-4 md:border-l md:border-r md:border-base h-full cursor-pointer" onClick={onClick}>
        <button className="relative" onClick={() => setShow(!show)}>
          <BellIcon className="w-6 h-6 text-gray-500" />
          <LedIndicator valir={valir} value={value} />
        </button>
        <ClickAwayListener onClickAway={()=>show && setShow(false)}>
          <span className={`${show ? " md:translate-y-12 block absolute top-20 right-7 md:right-64" : "hidden"}`} >
            <NotificacionesMenu />
          </span>
        </ClickAwayListener>
      </div>
    </>

  )

};

const NotificacionesMenu = () => {
  return (
    <>
      <div className=" md:translate-y-12 divide-y overflow-auto w-80 h-96 md:w-96 md:h-96 rounded-md bg-gray-50 shadow-md absolute right-0 inset-y-full  z-50 p-5">
        <div className="flex gap-3 mb-2 pt-2">
          <span className="flex items-center pl-2 mr-2">
            IMG
          </span>
          <div className="w-full truncate">
            <span>
              <p>nombre</p>
            </span>
            <p className="truncate">
              nuevo mensajeeeeeeeeeeeeeeeeeeeee
            </p>
          </div>
        </div>
        <div className="flex gap-3 mb-2 pt-2">
          <span className="flex items-center pl-2 mr-2">
            IMG
          </span>
          <div className="w-full">
            <span>
              <p>nombre</p>
            </span>
            <p>
              nuevo mensaje
            </p>
          </div>
        </div>
        <div className="flex gap-3 mb-2 pt-2">
          <span className="flex items-center pl-2 mr-2">
            IMG
          </span>
          <div className="w-full truncate">
            <span>
              <p>nombre</p>
            </span>
            <p className="truncate">
              nuevo mensajeeeeeeeeeeeeeeeeeeeee
            </p>
          </div>
        </div>
        <div className="flex gap-3 mb-2 pt-2">
          <span className="flex items-center pl-2 mr-2">
            IMG
          </span>
          <div className="w-full">
            <span>
              <p>nombre</p>
            </span>
            <p>
              nuevo mensaje
            </p>
          </div>
        </div>
        <div className="flex gap-3 mb-2 pt-2">
          <span className="flex items-center pl-2 mr-2">
            IMG
          </span>
          <div className="w-full truncate">
            <span>
              <p>nombre</p>
            </span>
            <p className="truncate">
              nuevo mensajeeeeeeeeeeeeeeeeeeeee
            </p>
          </div>
        </div>
        <div className="flex gap-3 mb-2 pt-2">
          <span className="flex items-center pl-2 mr-2">
            IMG
          </span>
          <div className="w-full">
            <span>
              <p>nombre</p>
            </span>
            <p>
              nuevo mensaje
            </p>
          </div>
        </div>
        <div className="flex gap-3 mb-2 pt-2">
          <span className="flex items-center pl-2 mr-2">
            IMG
          </span>
          <div className="w-full truncate">
            <span>
              <p>nombre</p>
            </span>
            <p className="truncate">
              nuevo mensajeeeeeeeeeeeeeeeeeeeee
            </p>
          </div>
        </div>
        <div className="flex gap-3 mb-2 pt-2">
          <span className="flex items-center pl-2 mr-2">
            IMG
          </span>
          <div className="w-full">
            <span>
              <p>nombre</p>
            </span>
            <p>
              nuevo mensaje
            </p>
          </div>
        </div>
      </div>
    </>
  )
}