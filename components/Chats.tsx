import { FC, memo } from "react";
import useHover from "../hooks/useHover";
import { SearchIcon } from "./icons";
import Image from 'next/image'
import Profile from '../assets/img/profile.png';
import { ChatContextProvider } from '../context'
import SwiperCore, { Pagination, Navigation } from 'swiper';
import { Swiper, SwiperSlide } from "swiper/react";
import { CircleImage } from "./CircleImg"
import { Item } from './Item'
import { Section } from './Section'
import { Buscador } from './Buscador'


//install Swiper modules
SwiperCore.use([Pagination, Navigation]);

interface propsChats {
  active: boolean
}

const OptionList: FC<propsChats> = ({ active }) => {
  const {contacts} = ChatContextProvider()
  console.log("contacts info",contacts)
  return (
    <>
      <div className={`${active ? "" : "hidden"} lg:flex col-span-12 lg:col-span-3 w-full chats p-6 gap-4 flex-col flex items-center justify-start overflow-auto `}>
        <Buscador />
        <div className="flex gap-4 flex-col w-full">
          <Swiper
            pagination={{ clickable: true }}
            navigation
            slidesPerView={1}
            className="w-full h-full pb-10"
          >
            <SwiperSlide>
              <Section image={Profile} name={"Francisco"} info={"Chat chat chat chat chat"} />
            </SwiperSlide>
            <SwiperSlide >
              <Section image={Profile} name={"Francisco"} info={"contacto contacto contaco"} />
            </SwiperSlide>
            <SwiperSlide >
              <Section image={Profile} name={"Bodas"} info={"evento evento eventp"} />
            </SwiperSlide>
          </Swiper>
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

export default OptionList;



