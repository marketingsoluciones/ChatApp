import { FC, memo } from "react";
import useHover from "../hooks/useHover";
import { SearchIcon } from "./icons";
import Image from 'next/image'
import Profile from '../assets/img/profile.png'

interface propsChats {
  active: boolean
}
const Chats: FC<propsChats> = ({ active }) => {
  return (
    <>
      <div className={`${active ? "" : "hidden"} lg:flex col-span-12 lg:col-span-3 w-full chats p-6 gap-4 flex-col flex items-center justify-start `}>
        <div className="flex gap-4 flex-col w-full">
          <h2 className="font-medium text-xl text-gray-200">Chats</h2>
          <Buscador />
          <Users />
        </div>
        <div className="grid gap-6 overflow-auto ">
          <h3 className="font-medium text-md pt-4">Mis conversaciones</h3>
          <CardChat />
          <CardChat />
          <CardChat />
          <CardChat />

        </div>
      </div>
      <style jsx>
        {`
          .chats {
            height: calc(100vh - 4rem);
          }

          ::-webkit-scrollbar {
            display: none;
          

        `}
      </style>
    </>
  );
};

export default Chats;

const Buscador: FC = (props) => {
  return (
    <span className="relative">
      <input
        placeholder="Search for messages or users..."
        type="text"
        className="focus:outline-none bg-white rounded shadow-sm px-4 py-2 w-full text-sm focus:ring transition"
        {...props}
      />
      <SearchIcon className="w-4 h-4 absolute inset-y-0 my-auto right-3 text-gray-200 opacity-60 h-max" />
    </span>
  );
};

interface propsCircleUser {
  image: any;
  name: string;
}

const CircleUser: FC<propsCircleUser> = memo(({ image, name }) => {
  const [hoverRef, isHovered] = useHover();
  return (
    <div
      ref={hoverRef}
      className="flex flex-col items-center justify-center w-12 gap-1 cursor-pointer"
    >
      {isHovered && (
        <div className="absolute transform mb-12 -translate-y-full bg-black w-max h-max text-white opacity-70 visibility-none px-2 py-1 rounded-lg ">
          <p className="text-white font-medium text-xs text-center">
            Francisco Montilla
          </p>
        </div>
      )}
      <span className="relative">
        <Image src={image} alt={name} width={48} height={48} objectFit={"contain"} className="rounded-full" />
        <svg className="bg-green rounded-full w-3 h-3 absolute bottom-1 right-1 border-2 border-white" />
      </span>
      <p className="text-xs text-gray-200 truncate w-full">{name}</p>
    </div>
  );
});

const Users: FC = () => {
  return (
    <>
      <div className="w-full overflow-y-hidden overflow-x-auto flex gap-6 ">
        <CircleUser image={Profile} name="Francisco Montilla" />
        <CircleUser image={Profile} name="Francisco Montilla" />
        <CircleUser image={Profile} name="Francisco Montilla" />
        <CircleUser image={Profile} name="Francisco Montilla" />
      </div>
      <style jsx>
        {`
          ::-webkit-scrollbar {
            display: none;
          }
        `}
      </style>
    </>
  );
};

const CardChat: FC = () => {
  return (
    <div className="bg-white shadow w-full rounded-lg h-max transition duration-800 hover:bg-secondary grid grid-cols-4 items-center p-4 cursor-pointer">
      <Image src={Profile} width={48} height={48} objectFit={"contain"} className="rounded-full col-span-1" alt="" />
      <div className="col-span-3">
        <h3 className="font-semibold text-gray-300 text-sm">Jhon Travolta</h3>
        <p className="font-regular text-gray-200 text-xs w-full truncate">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt
          dolore accusamus id. Dignissimos in nam ab! Est repudiandae, in
          voluptates debitis a impedit architecto.
        </p>
      </div>
    </div>
  );
};
