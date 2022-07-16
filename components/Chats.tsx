import { FC, memo, useState } from "react";
import useHover from "../hooks/useHover";
import { SearchIcon } from "./icons";
import Image from 'next/image'
import Profile from '../assets/img/profile.png';
import { ChatContextProvider } from '../context'
import { CircleImage } from "./CircleImg"
import { Item } from './Item'
import { Section } from './Section'
import { Buscador } from './Buscador'
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { Scrollbar, Navigation, Pagination } from "swiper";

// Import Swiper styles
import 'swiper/css';
import "swiper/css/bundle";
import Button from "./Button";



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
        <div className="flex w-full">
          <Button className="md:block bg-primary text-white w-1/3 py-1 text-sm transition hover:opacity-90" onClick={() => { }} title="Chats" />
          <Button className="md:block bg-primary text-white w-1/3 py-1 text-sm transition hover:opacity-90" onClick={() => { }} title="Constactos" />
          <Button className="md:block bg-primary text-white w-1/3 py-1 text-sm transition hover:opacity-90" onClick={() => { }} title="Eventos" />
        </div>
        <div className="flex gap-4 flex-col w-full">
          {/* <Swiper
            scrollbar={{
              hide: false
            }}
            modules={[Scrollbar]}
          >
            <SwiperSlide>Slide 1</SwiperSlide>
            <SwiperSlide>Slide 2</SwiperSlide>
            <SwiperSlide>Slide 3</SwiperSlide>
            <SwiperSlide>Slide 4</SwiperSlide>
            <SwiperSlide>Slide 5</SwiperSlide>
            <SwiperSlide>Slide 6</SwiperSlide>
            <SwiperSlide>Slide 7</SwiperSlide>
            <SwiperSlide>Slide 8</SwiperSlide>
            <SwiperSlide>Slide 9</SwiperSlide>
          </Swiper> */}
          <Swiper
            slidesPerView={1}
            className="w-full h-full pb-10"
            scrollbar={{
              hide: false
            }}
            modules={[Navigation, Pagination, Scrollbar]}
          >
            <SwiperSlide>
              <h3>Contactos</h3>
              {
                resultados?.map((item, idx) => (

                  <Section key={idx} image={Profile} name={item.nickName} info={item.correo} _id={item._id} />


                ))
              }
            </SwiperSlide>
            <SwiperSlide >
              <h3>Chats</h3>
              <Section image={Profile} name={"Francisco"} info={"contacto contacto contaco"} _id={"dsddfasdfasd"} />
            </SwiperSlide>
            <SwiperSlide >
              <h3>Eventos</h3>
              {
                resultados?.map((item) => {
                  const nombres = item.eventos
                  console.log(nombres)
                  return (
                    <>
                      {
                        nombres.map((item, idx) => (
                          <Section image={Profile} key={idx} name={item.nombre} info={"ID: " + item._id} _id={"dfasdfa"} />

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



