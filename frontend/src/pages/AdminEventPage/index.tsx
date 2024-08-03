import {useForm} from "react-hook-form";
import {Select} from "../../shared/FormFields/Select";
import {DatePicker} from "../../shared/FormFields/DatePicker";
import {TimePicker} from "../../shared/FormFields/TimePicker";
import banner from "../../app/assets/image/other/admin_banner_event.webp";
import cn from "classnames";
import style from "./index.module.scss"

type TOption = {
  value: number;
  label: string;
}

export type TFormValues = {
  name: string;
  date: string | null;
  time: string | null;
  description: string;
  format: TOption;
  country: TOption;
  city: TOption;
  address: string;
  speakers: [];

  link_stream: string;
  link_record: string;
};

export const AdminEventPage = () => {
  const {
    register,
    formState: {errors},
    control,
  } = useForm<TFormValues>({mode: 'onTouched'});

  return (
    <>
      <img className={style.banner} src={banner} alt="banner"/>

      <div className='container'>
        <div className={style.container}>
          <form className={style.form}>
            <h1>Создать мероприятие</h1>

            <div className='inputBlock'>
              <h3 className='required'>Название</h3>
              <input
                className={cn({'error': errors.name})}
                type='text'
                placeholder='введите название мероприятия'
                {...register('name', {
                  required: 'обязательное поле',
                  minLength: {
                    value: 2,
                    message: 'слишком короткое название',
                  },
                })}
              />
              <span className='errorMessage'>
                {errors?.name?.message}&nbsp;
              </span>
            </div>

            <div className={style.row}>
              <div className='inputBlock'>
                <h3 className='required'>Дата</h3>
                <DatePicker
                  name="date"
                  control={control}
                  rules={{required: 'обязательное поле'}}
                />
                <span className='errorMessage'>
                  {errors.date?.message}&nbsp;
                </span>
              </div>

              <div className='inputBlock'>
                <h3 className='required'>Время</h3>
                <TimePicker
                  name='time'
                  control={control}
                  rules={{required: 'обязательное поле'}}
                />
                <span className='errorMessage'>
                  {errors.time?.message}&nbsp;
                </span>
              </div>

              <div className='inputBlock'>
                <h3 className='required'>Формат</h3>
                <Select
                  name='format'
                  control={control}
                  options={[{value: 'online', label: 'online'}, {value: 'offline', label: 'offline'}]}
                  placeholder='не выбран'
                  rules={{required: 'обязательное поле'}}
                />
                <span className='errorMessage'>
                  {errors?.format?.message}&nbsp;
                </span>
              </div>
            </div>

            <div className='inputBlock'>
              <h3 className='required'>Описание мероприятия</h3>
              <textarea
                className={cn({'error': errors.description})}
                placeholder='введите описание мереприятия'
                {...register('description', {
                  required: 'обязательное поле',
                  minLength: {
                    value: 2,
                    message: 'слишком короткое описание',
                  },
                })}
              />
              <span className='errorMessage'>
                {errors?.description?.message}&nbsp;
              </span>
            </div>

            <div className={style.addressRow}>
              <div className='inputBlock'>
                <h3 className='required'>Страна</h3>
                <Select
                  name='country'
                  control={control}
                  options={[{value: 1, label: 'Россия'}, {value: 2, label: 'Белорусия'}]}
                  placeholder='не выбрана'
                  rules={{required: 'обязательное поле'}}
                />
                <span className='errorMessage'>
                  {errors?.country?.message}&nbsp;
                </span>
              </div>

              <div className='inputBlock'>
                <h3 className='required'>Город</h3>
                <Select
                  name='city'
                  control={control}
                  options={[{value: 1, label: 'Москва'}, {value: 2, label: 'Санкт-петербург'}]}
                  placeholder='не выбран'
                  rules={{required: 'обязательное поле'}}
                />
                <span className='errorMessage'>
                  {errors?.city?.message}&nbsp;
                </span>
              </div>

              <div className='inputBlock'>
                <h3 className='required'>Адрес</h3>
                <input
                  className={cn({'error': errors.address})}
                  type='text'
                  placeholder='введите адрес'
                  {...register('address', {
                    required: 'обязательное поле',
                    minLength: {
                      value: 2,
                      message: 'слишком короткий адрес',
                    },
                  })}
                />
                <span className='errorMessage'>
                  {errors?.address?.message}&nbsp;
                </span>
              </div>
            </div>

            {/*<label>*/}
            {/*  <h3 className={style.required}>Укажите ваших спикеров</h3>*/}
            {/*  <input className={style.input} type="text"/>*/}
            {/*</label>*/}

            <div className='inputBlock'>
              <h3>Ссылка на трансляцию мероприятия</h3>
              <input
                className={cn({'error': errors.link_stream})}
                type='text'
                placeholder='https://...'
                {...register('link_stream', {
                  pattern: {
                    value: /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/,
                    message: 'некорректный URL',
                  },
                })}
              />
              <span className='errorMessage'>
                {errors?.link_stream?.message}&nbsp;
              </span>
            </div>

            <div className='inputBlock'>
              <h3>Ссылка на запись мероприятия</h3>
              <input
                className={cn({'error': errors.link_record})}
                type='text'
                placeholder='https://...'
                {...register('link_record', {
                  pattern: {
                    value: /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/,
                    message: 'некорректный URL',
                  },
                })}
              />
              <span className='errorMessage'>
                {errors?.link_record?.message}&nbsp;
              </span>
            </div>


            <button className={style.buttonSubmit} type='submit'>Сохранить</button>
            <button className={style.buttonArchive} type='button'>В архив</button>

          </form>

          <div className={style.gallery}>
            <h2>Галерея</h2>

            <div>
              <img src={banner} alt="event"/>
              <img src={banner} alt="event"/>
              <img src={banner} alt="event"/>
              <img src={banner} alt="event"/>
              <img src={banner} alt="event"/>
              <button>+ Ещё фото</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
