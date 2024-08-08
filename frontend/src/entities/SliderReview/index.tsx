import {Swiper, SwiperSlide} from 'swiper/react';
import {Pagination, A11y, Autoplay, Keyboard, Navigation, EffectFade} from 'swiper/modules'
import {useAppSelector} from "../../app/services/hooks.ts";
import useMediaQuery from '@mui/material/useMediaQuery'
import cn from "classnames";
import style from './index.module.scss'

export const SliderReview = () => {
  const {data} = useAppSelector((store) => store.review);
  const isDesktop = useMediaQuery('(min-width: 1200px)')

  return (
    <div className={style.container}>
      <h2 className={style.title}>Отзывы</h2>

      <div className={style.wrapper}>
        <Swiper
          className={cn(style.slider, 'custom-navigation')}
          modules={[Navigation, Pagination, EffectFade, A11y, Autoplay, Keyboard]}
          autoplay={{delay: 5000}}
          effect="fade"
          loop={true}
          speed={200}
          pagination={{
            clickable: true,
            el: '#review-pagination'
          }}
          keyboard={{
            enabled: true,
            onlyInViewport: true,
          }}
          navigation={Boolean(isDesktop)}
        >
          {data.map(({image, company, description, text}) => (
            <SwiperSlide key={image} className={style.slide}>
              <div>
                <img src={image} alt="slide image"/>
                <h3>{company}</h3>
                <span className={style.description}>{description}</span>
                <p className={style.text}>{text}</p>
              </div>
            </SwiperSlide>))}
        </Swiper>
      </div>

      <div className='pagination-bars' id='review-pagination'></div>

    </div>)
};
