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
          <form className={style.form} action="">
            <h1>Создать мероприятие</h1>

            <label>
              <h3 className={style.required}>Название</h3>
              <input
                className={cn(style.input, {[style.error]: errors.name})}
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
              <span className={style.errorMessage}>
                {errors?.name?.message || '\u200B'}
              </span>
            </label>

            <div className={style.row}>
              <label>
                <h3 className={style.required}>Дата</h3>
                <DatePicker
                  name="date"
                  control={control}
                  rules={{required: 'обязательное поле'}}
                />
                <span className={style.error}>
                  {errors.date?.message || '\u200B'}
                </span>
              </label>

              <label>
                <h3 className={style.required}>Время</h3>
                <TimePicker
                  name='time'
                  control={control}
                  rules={{required: 'обязательное поле'}}
                />
                <span className={style.error}>
                  {errors.time?.message || '\u200B'}
                </span>
              </label>

              <label>
                <h3 className={style.required}>Формат</h3>
                <Select
                  name='format'
                  control={control}
                  options={[{value: 'online', label: 'online'}, {value: 'offline', label: 'offline'}]}
                  placeholder='не выбран'
                  rules={{required: 'обязательное поле'}}
                />
                <span className={style.errorMessage}>
                  {errors?.format?.message || '\u200B'}
                </span>
              </label>
            </div>

            <label>
              <h3 className={style.required}>Описание мероприятия</h3>
              <textarea
                className={cn(style.input, {[style.error]: errors.description})}
                placeholder='введите описание мереприятия'
                {...register('description', {
                  required: 'обязательное поле',
                  minLength: {
                    value: 2,
                    message: 'слишком короткое описание',
                  },
                })}
              />
              <span className={style.errorMessage}>
                {errors?.description?.message || '\u200B'}
              </span>
            </label>

            <div className={style.addressRow}>
              <label>
                <h3 className={style.required}>Страна</h3>
                <Select
                  name='country'
                  control={control}
                  options={[{value: 1, label: 'Россия'}, {value: 2, label: 'Белорусия'}]}
                  placeholder='не выбрана'
                  rules={{required: 'обязательное поле'}}
                />
                <span className={style.errorMessage}>
                  {errors?.country?.message || '\u200B'}
                </span>
              </label>

              <label>
                <h3 className={style.required}>Город</h3>
                <Select
                  name='city'
                  control={control}
                  options={[{value: 1, label: 'Москва'}, {value: 2, label: 'Санкт-петербург'}]}
                  placeholder='не выбран'
                  rules={{required: 'обязательное поле'}}
                />
                <span className={style.errorMessage}>
                  {errors?.city?.message || '\u200B'}
                </span>
              </label>

              <label>
                <h3 className={style.required}>Адрес</h3>
                <input
                  className={cn(style.input, {[style.error]: errors.name})}
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
                <span className={style.errorMessage}>
                  {errors?.address?.message || '\u200B'}
                </span>
              </label>
            </div>

            {/*<label>*/}
            {/*  <h3 className={style.required}>Укажите ваших спикеров</h3>*/}
            {/*  <input className={style.input} type="text"/>*/}
            {/*</label>*/}

            <label>
              <h3>Ссылка на трансляцию мероприятия</h3>
              <input
                className={cn(style.input, {[style.error]: errors.link_stream})}
                type='text'
                placeholder='https://...'
                {...register('link_stream', {
                  pattern: {
                    value: /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/,
                    message: 'некорректный URL',
                  },
                })}
              />
              <span className={style.errorMessage}>
                {errors?.link_stream?.message || '\u200B'}
              </span>
            </label>

            <label>
              <h3>Ссылка на запись мероприятия</h3>
              <input
                className={cn(style.input, {[style.error]: errors.link_record})}
                type='text'
                placeholder='https://...'
                {...register('link_record', {
                  pattern: {
                    value: /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/,
                    message: 'некорректный URL',
                  },
                })}
              />
              <span className={style.errorMessage}>
                {errors?.link_record?.message || '\u200B'}
              </span>
            </label>


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
