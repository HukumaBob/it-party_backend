import React from "react";
import dayjs from "dayjs";
import {useForm} from "react-hook-form";
import {DatePicker} from "../../shared/FormFields/DatePicker";
import {TimePicker} from "../../shared/FormFields/TimePicker";
import {Select} from "../../shared/FormFields/Select";
import {useAppDispatch, useAppSelector} from "../../app/services/hooks.ts";
import {createEvent} from "../../app/services/slices/adminEventCreateSlice.ts";
import LoadingIcon from "../../app/assets/icons/loading.svg?react";
import ErrorIcon from "../../app/assets/icons/error.svg?react";
import cn from "classnames";
import style from "./index.module.scss";

type FileWithMetadata = {
  file: File;
  fileName: string;
  fieldName: string;
  url: string;
  caption: string;
};
type TProps = {
  selectedFiles: FileWithMetadata[];
  logo: string;
  setFilesError: (value: boolean) => void;
};
type TOption = { value: number; label: string };
export type TFormData = {
  name: string;
  date: string;
  time: string;
  description: string;
  format: TOption[];
  country: TOption;
  city: TOption;
  address: string;
  speakers: number[];
  specializations: number[];
  event_admin: number[];
  stream: string;
  record_link: string;
  form_template: Record<string, any>;
  logo: string;
  files: File[];
};

export const FormCreateEvent: React.FC<TProps> = ({selectedFiles, logo, setFilesError}) => {
  const dispatch = useAppDispatch()
  const {countrySelectOptions, status: countryListStatus} = useAppSelector((state) => state.country);
  const {citySelectOptions, status: cityListStatus} = useAppSelector((state) => state.city);
  const {statusCreateEvent} = useAppSelector((state) => state.eventCreate);
  const {id: userId} = useAppSelector((state) => state.profile.data);
  const isLoading = [statusCreateEvent, countryListStatus, cityListStatus].includes('loading');
  const isError = [statusCreateEvent, countryListStatus, cityListStatus].includes('error');

  const {
    register,
    handleSubmit,
    formState: {errors},
    // reset,
    control,
    // watch,
    // setValue
  } = useForm<TFormData>({mode: "onTouched"});

  const onSubmit = handleSubmit(
    (formData: TFormData) => {
      if (selectedFiles.length === 0) return setFilesError(true);

      const {format, country, ...data} = formData;

      const createData = {
        ...data,
        ...format.reduce((acc: Record<string, boolean>, current) => {
          acc[current.value] = true;
          return acc;
        }, {}),
        date: dayjs(data.date).format('YYYY-MM-DD'),
        time: dayjs(data.time).format('HH:mm'),
        city: data.city.value,
        speakers: [],
        specializations: [],
        event_admin: [userId],
        form_template: {
          "name": "Standart",
          "fields": {
            "first_name": "",
            "last_name": "",
            "date_of_birth": "",
            "place_of_work": "",
            "position": "",
            "specialization": "",
            "experience": "",
            "phone": "",
            "online": false
          }
        },
        logo: logo,
        files: selectedFiles.map(({file, caption}) => ({file, caption})),
      };
      dispatch(createEvent(createData));
    }
  )

  return (
    <form className={style.form} onSubmit={onSubmit}>
      <h1 className={style.title}>Создать мероприятие</h1>

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
      </div>

      <div className='inputBlock'>
        <h3 className='required'>Формат</h3>
        <Select
          name='format'
          control={control}
          options={[{value: 'online', label: 'online'}, {value: 'offline', label: 'offline'}]}
          placeholder='не выбран'
          rules={{required: 'обязательное поле'}}
          multiple={true}
        />
        <span className='errorMessage'>
          {errors?.format?.message}&nbsp;
        </span>
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

      <div className={style.row}>
        <div className='inputBlock'>
          <h3 className='required'>Страна</h3>
          <Select
            name='country'
            control={control}
            options={countrySelectOptions}
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
            options={citySelectOptions}
            placeholder='не выбран'
            rules={{required: 'обязательное поле'}}
          />
          <span className='errorMessage'>
            {errors?.city?.message}&nbsp;
          </span>
        </div>
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

      {/*<label>*/}
      {/*  <h3 className={style.required}>Укажите ваших спикеров</h3>*/}
      {/*  <input className={style.input} type="text"/>*/}
      {/*</label>*/}

      <div className='inputBlock'>
        <h3>Ссылка на трансляцию мероприятия</h3>
        <input
          className={cn({'error': errors.stream})}
          type='text'
          placeholder='https://...'
          {...register('stream', {
            pattern: {
              value: /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/,
              message: 'некорректный URL',
            },
          })}
        />
        <span className='errorMessage'>
          {errors?.stream?.message}&nbsp;
        </span>
      </div>

      <div className='inputBlock'>
        <h3>Ссылка на запись мероприятия</h3>
        <input
          className={cn({'error': errors.record_link})}
          type='text'
          placeholder='https://...'
          {...register('record_link', {
            pattern: {
              value: /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/,
              message: 'некорректный URL',
            },
          })}
        />
        <span className='errorMessage'>
          {errors?.record_link?.message}&nbsp;
        </span>
      </div>


      <button className={style.buttonSubmit} type='submit'>Сохранить</button>
      <button className={style.buttonArchive} type='button'>В архив</button>


      <div className={cn('modalLoadingErrorMessage', {'visible': isLoading || isError})}>
        {isLoading && <LoadingIcon/>}
        {isError && <ErrorIcon/>}
      </div>

    </form>
  )
}