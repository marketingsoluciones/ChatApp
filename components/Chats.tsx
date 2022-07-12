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
  const { contacts } = ChatContextProvider()
  const resultados = contacts?.results
  console.log(resultados)
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
              <h3>Contactos</h3>
              {
                resultados?.map((item, idx) => (
                  <Section key={idx} image={Profile} name={item.nickName} info={item.correo} />
                ))
              }
            </SwiperSlide>
            <SwiperSlide >
              <h3>Chats</h3>
              <Section image={Profile} name={"Francisco"} info={"contacto contacto contaco"} />
            </SwiperSlide>
            <SwiperSlide >
              <h3>Eventos</h3>
              {
                resultados?.map((item) => {
                  const nombres = item.eventos
                  return (
                    <>
                      {
                        nombres.map((item, idx) => (
                        <Section image={Profile} key={idx} name={item.nombre} info={"ID: "+item._id} />
                      ))}
                    </>
                  )
                })
              }

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



