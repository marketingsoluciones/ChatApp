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

import { data } from '../utils/data'



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
  const { contacts, events } = ChatContextProvider()
  const resultsContact = contacts?.results
  const resultsEvents = events?.results
  console.log(resultsEvents)


  const handleScroll = (event: any) => {
    console.log('scrollTop: ', event.currentTarget.scrollTop);
    console.log('offsetHeight: ', event.currentTarget.offsetHeight);
  };
  const className = "block bg-primary text-white w-1/3 text-sm p-1 transition hover:opacity-90"
  return (
    <>
      <div className="container col-span-12 lg:col-span-3 h-max-1 calHeight ">
        <div className={`${active ? "" : "hidden"} lg:flex col-span-12 lg:col-span-3 w-full h-full chats p-2 gap-4 flex-col flex items-center justify-start overflow-auto `}>
          <Buscador />
          <div className="flex w-full">
            <Button className={className} onClick={() => { setPage(0) }} title="Chats" />
            <Button className={className} onClick={() => { setPage(1) }} title="Contactos" />
            <Button className={className} onClick={() => { setPage(2) }} title="Eventos" />
          </div>
          <div className="w-full bg-white">
            <div className="col-span-12 lg:col-span-3 h-max-1 calHeight2">
              <Swiper key={1} className="bg-white"
                // pagination={{ dynamicBullets: true, type: 'bullets', clickable: true }}
                scrollbar={{ hide: false, dragClass: 'swiper-scrollbar-drag-modified', horizontalClass: 'swiper-scrollbar-horizontal-modified' }}
                modules={[Pagination, Scrollbar]}
              >
                <SlideTo page={page} />
                <SwiperSlide className="w-full calHeight3" onScroll={handleScroll}>
                  {
                    data?.map((item, idx) => (
                      <Section key={idx} image={Profile} name={item.nickName} info={item.correo} _id={item._id} />
                    ))
                  }
                </SwiperSlide>
                <SwiperSlide className="w-full calHeight3">
                  {
                    resultsContact?.map((item, idx) => (
                      <Section key={idx} image={Profile} name={item.nickName} info={`${item.eventos.map((it => it.nombre)).toString().replace(/,/g, ", ")}`} _id={item._id} />
                    ))
                  }
                </SwiperSlide>
                <SwiperSlide className="w-full calHeight3">
                  {
                    resultsEvents?.map((item, idx) => (
                      <Section key={idx} image={Profile} name={item.nombre} info={item._id} _id={item._id} />
                    ))
                  }
                </SwiperSlide>
              </Swiper>
            </div>
          </div>
        </div>
      </div >
      <style>
        {`
          .calHeight {
            height: calc(100vh - 4rem);
            background: #f7628c;
          }
          .calHeight2 {
            height: calc(100vh - 12rem);
            overflow: scroll;
            //background: #ffffff;
          }
          .calHeight3 {
            height: calc(100vh - 12rem);
            overflow: scroll;
            //background: #f0f0f0;
          }
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



