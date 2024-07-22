import {useParams} from "react-router-dom";
import Masonry from '@mui/lab/Masonry';
import useMediaQuery from '@mui/material/useMediaQuery';
import {useSelector} from "../../app/types/hooks";
import {ModalRegistration} from "../../widgets/ModalRegistration";
import map from "../../app/assets/image/other/howToGet.png";
import dayjs from 'dayjs';
import cn from "classnames";
import style from "./index.module.scss";

export const EventPageView = () => {
  const {id} = useParams<{ id: string }>();
  const {name, date, logo, city, description, gallery, speakers, address} = useSelector(state => state.event.data)
  const cityList = useSelector((store) => store.city.cityList);
  const randomColor = [style.orange, style.green, style.blue, style.purple][Math.floor(Math.random() * 4)]
  const eventDate = dayjs(date)
  const isPhone = useMediaQuery('(max-width:767.98px)');
  const isPhoneSM = useMediaQuery('(max-width:575.98px)');
  const titleText = `${name}, ${eventDate.format('D MMMM YYYY')}, ${cityList[city]}`;

  return (
    <div className={cn(style.eventContainer, 'container')}>

      <div className={style.bannerBlock}>
        <div className={randomColor}></div>
        <img src={logo} alt="event logo"/>
        <h1>{name}</h1>
        <h2 className={randomColor}>
          <span>{eventDate.format('D MMMM YYYY').replace(/\s\d{4}$/, '')}</span> &nbsp;/ {cityList[city]}
        </h2>
        <p>{eventDate.year().toString().slice(-2)}’</p>
      </div>

      <div className={style.descriptionBlock}>
        <div className={style.wrapper}>
          <h2 className={style.title}>{titleText}</h2>
          <p>
            {description}
          </p>
        </div>

        <div className={style.buttonContainer}>
          <ModalRegistration id={Number(id)}/>
        </div>
      </div>

      <Masonry
        className={style.gallery}
        columns={isPhoneSM ? 1 : isPhone ? 2 : 3}
        spacing={2}>
        {gallery.map((item) => (
          <div key={item.id}>
            <img src={item.event_photo} alt={item.caption} loading='lazy'/>
          </div>
        ))}
      </Masonry>

      <div className={style.aboutBlock}>
        <h2 className={style.title}>{titleText}</h2>
        <p className={style.description}>Регистрация открыта.<br/>Для регистрации необходимо заполнить<br/>форму.</p>
        <div className={style.buttonContainer}>
          <ModalRegistration id={Number(id)}/>
        </div>
      </div>

      <div className={style.speakersBlock}>
        <h2 className={style.title}>Докладчики</h2>


        <div className={style.wrapper}>
          {speakers.map(({id, foto, name, info, specializations}) => (
            <div className={style.speaker} key={id}>
              <img className={style.image} src={foto} alt='speaker avatar'/>
              <div className={style.infoContainer}>
                <div className={style.info}>
                  <h3 className={style.name}>{name.split(' ').map((item) => <span key={item}>{item}</span>)}</h3>
                  <p>{info}</p>
                </div>
                <div className={style.specializations}>
                  <span className={style.name}>{name.split(' ').map((item) => <span key={item}>{item}</span>)}</span>
                  <p>{specializations}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className={style.mapBlock}>
        <h2>Как добраться</h2>
        <address>{address}</address>
        <img src={map} alt='map'/>
      </div>

    </div>
  );
};
