import {useState} from "react";
import {Swiper, SwiperProps, SwiperSlide} from 'swiper/react';
import {EffectCube, Pagination, A11y, Autoplay, Keyboard} from 'swiper/modules'
import {useSelector} from "../../app/types/hooks";
import cn from "classnames";
import style from './index.module.scss'

export const SliderCube = () => {
  const [index, setIndex] = useState(0);
  const {cube: data} = useSelector((store) => store.slider);
  const classes = [style.slide1, style.slide2, style.slide3, style.slide4]

  return (
    <div className={cn(style.container, classes[index])}>
      <div className={style.square}></div>
      <p className={style.subTitle}>
        <span>{data[index].date}</span>&nbsp;/ {data[index].city}
      </p>
      <span className={style.year} key={data[index].date}>24’</span>
      <p className={style.title} key={data[index].title}>{data[index].title}</p>

      <Swiper
        className={style.slider}
        modules={[Pagination, EffectCube, A11y, Autoplay, Keyboard]}
        autoplay={{delay: 900}}
        effect="cube"
        speed={900}
        pagination={{
          clickable: true,
          el: '#cube-pagination'
        }}
        keyboard={{
          enabled: true,
          onlyInViewport: true,
        }}
        onTransitionStart={(swiper: SwiperProps) => setIndex(swiper.realIndex)}
      >
        {data.map(({image}) => (
          <SwiperSlide key={image} className={style.slide}>
            <img className={style.image} src={image} alt="slide image"/>
          </SwiperSlide>))}
      </Swiper>

      <div className="pagination-bars" id='cube-pagination'></div>
    </div>)
};
