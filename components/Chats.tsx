import { FC, useEffect, useState } from "react";
import Profile from '../assets/img/profile.png';
import { ChatContextProvider } from '../context'
import { Section } from './Section'
import { Buscador } from './Buscador'
// Import Swiper React components
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';
import { Scrollbar, Navigation, Pagination } from "swiper";

// Import Swiper styles
import 'swiper/css';
import "swiper/css/bundle";
import Button from "./Button";



interface propsChats {
  active: boolean
}
interface propsSlideto {
  page: number
}
const SlideTo: FC<propsSlideto> = ({ page }) => {
  const swiper = useSwiper();
  useEffect(() => {
    swiper.slideTo(page)
  }, [page, swiper])
  return <></>
}
const OptionList: FC<propsChats> = ({ active }) => {
  const [page, setPage] = useState(0)
  const { contacts } = ChatContextProvider()
  const resultados = [...contacts?.results, ...contacts?.results, ...contacts?.results]

  console.log(resultados)
  const className = "block bg-primary text-white w-1/3 text-sm transition hover:opacity-90"
  return (
    <>
      <div className={`${active ? "" : "hidden"} lg:flex col-span-12 lg:col-span-3 w-full chats p-6 gap-4 flex-col flex items-center justify-start overflow-auto `}>
        <Buscador />
        <div className="flex w-full">
          <Button className={className} onClick={() => { setPage(0) }} title="Chats" />
          <Button className={className} onClick={() => { setPage(1) }} title="Contactos" />
          <Button className={className} onClick={() => { setPage(2) }} title="Eventos" />
        </div>
        <div className="w-full">
          <Swiper
            // pagination={{ dynamicBullets: true, type: 'bullets', clickable: true }}
            scrollbar={{ hide: false, dragClass: 'swiper-scrollbar-drag-modified', horizontalClass: 'swiper-scrollbar-horizontal-modified' }}
            modules={[Pagination, Scrollbar]}
          >
            <SlideTo page={page} />

            <SwiperSlide className="absolute top-0 left-0 w-full">
              {
                resultados?.map((item, idx) => (
                  <Section key={idx} image={Profile} name={item.nickName} info={item.correo} _id={item._id} />
                ))
              }
            </SwiperSlide>
            <SwiperSlide className="absolute top-0 left-0 w-full">
              <Section image={Profile} name={"Francisco"} info={"contacto contacto contaco"} _id={"dsddfasdfasd"} />
            </SwiperSlide>
            <SwiperSlide className="absolute top-0 left-0 w-full">
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
      <style>
        {`
          .swiper-scrollbar-horizontal-modified {
            position: absolute;
            left: 0%;
            bottom: 0px;
            z-index: 50;
            height: 5px;
            width: 393.5px;
            lef: 0;
            top: 0;
            background: #f7628c;
            border-radius: 0px;
          }
          .swiper-scrollbar-drag-modified {
            height: 100%;
            width: 50%;
            position: relative;
            background: hwb(343deg 64% 2%);
            border-radius: 0px;
            left: 0;
            top: 0;
          }
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



