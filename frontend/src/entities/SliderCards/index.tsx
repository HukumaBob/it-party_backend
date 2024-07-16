import React from "react";
import {Swiper, SwiperSlide} from 'swiper/react';
import {A11y, Navigation} from 'swiper/modules'
import {CardEvent} from "../CardEvent";
import style from './index.module.scss'

type TEventCard = {
  id: number;
  name: string;
  description: string;
  logo: string;
  date: string;
  time: string;
  user_application_status: 'not_applied' | 'pending' | 'approved' | 'rejected' | 'is_favorite';
}

export const SliderCards: React.FC<{ data: TEventCard[] }> = ({data}) => (
  <div className='event-cards-slider'>
    <Swiper
      className='custom-navigation custom-navigation-bg'
      modules={[Navigation, A11y]}
      slidesPerView={1}
      speed={200}
      navigation={true}
      breakpoints={{
        576: {
          slidesPerView: 2,
          spaceBetween: 20
        },
        992: {
          slidesPerView: 3,
          spaceBetween: 20
        }
      }}
    >
      {data.map((event) => (
        <SwiperSlide key={event.id} className={style.slide}>
          <CardEvent {...event} />
        </SwiperSlide>))}
    </Swiper>
  </div>
);
