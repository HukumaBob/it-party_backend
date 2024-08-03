import {useEffect} from "react";
import {useForm} from "react-hook-form";
import {useDispatch, useSelector} from "../../app/types/hooks";
import {updateUserProfile} from "../../app/services/slices/profileUserSlice.ts";
import {getFamilyStatusList} from "../../app/services/slices/familyStatusSlice.ts";
import {getCountryList} from "../../app/services/slices/countrySlice.ts";
import {DatePicker} from "../../shared/FormFields/DatePicker";
import {Select} from "../../shared/FormFields/Select";
import LoadingIcon from "../../app/assets/icons/loading.svg?react";
import ErrorIcon from "../../app/assets/icons/error.svg?react";
import dayjs, {Dayjs} from "dayjs";
import cn from "classnames";

type TOption = { value: number; label: string };
type TFormData = {
  "first_name": string;
  "last_name": string;
  "country": TOption;
  "date_of_birth": Dayjs;
  "familystatus": TOption;
};

export const FormDataPersonal = () => {
  const dispatch = useDispatch();
  const {data, statusGetProfile} = useSelector((state) => state.profileUser);
  const {countrySelectOptions, status: countryListStatus} = useSelector((state) => state.country);
  const {familyStatusSelectOptions, status: familyListStatus} = useSelector((state) => state.familyStatus);
  const isLoading = [statusGetProfile, countryListStatus, familyListStatus].includes('loading');
  const isError = [statusGetProfile, countryListStatus, familyListStatus].includes('error');

  useEffect(() => {
    countryListStatus === 'idle' && dispatch(getCountryList())
    familyListStatus === 'idle' && dispatch(getFamilyStatusList())
  }, [countryListStatus, familyListStatus]);

  const {
    register,
    handleSubmit,
    formState: {errors},
    reset,
    control
  } = useForm<TFormData>({mode: "onTouched"});

  useEffect(() => {
    if (statusGetProfile === 'success' && countryListStatus === 'success' && familyListStatus == 'success') {
      const getOption = (data: TOption[], target: number | undefined) =>
        data.find((option) => option.value === target) || {};

      reset({
        first_name: data.first_name,
        last_name: data.last_name,
        date_of_birth: dayjs(data.date_of_birth),
        country: getOption(countrySelectOptions, data.country),
        familystatus: getOption(familyStatusSelectOptions, data.familystatus),
      });
    }
  }, [statusGetProfile, countryListStatus, familyListStatus]);

  const onSubmit = (formData: TFormData) => {
    dispatch(updateUserProfile({
      ...formData,
      date_of_birth: dayjs(formData.date_of_birth).format('YYYY-MM-DD'),
      country: formData.country?.value,
      familystatus: formData.familystatus?.value
    }))
  };

  const today = dayjs();
  const minDate = today.subtract(100, 'year');
  const maxDate = today.subtract(10, 'year');

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className='inputBlock'>
        <h3>Имя</h3>
        <input
          className={cn({'error': errors.first_name})}
          type='text'
          placeholder='Иван'
          {...register("first_name", {
            minLength: {
              value: 2,
              message: "слишком короткое имя",
            },
            pattern: {
              value: /^[A-ZА-Я]+$/i,
              message: "некорректный формат имени",
            },
          })}
        />
        <span className='errorMessage'>
            {errors?.first_name?.message}&nbsp;
          </span>
      </div>

      <div className='inputBlock mt-sm'>
        <h3>Фамилия</h3>
        <input
          className={cn({'error': errors.last_name})}
          type='text'
          placeholder='Иванов'
          {...register("last_name", {
            minLength: {
              value: 2,
              message: "слишком короткая фамилия",
            },
            pattern: {
              value: /^[A-ZА-Я]+$/i,
              message: "некорректный формат фамилии",
            },
          })}
        />
        <span className='errorMessage'>
            {errors?.last_name?.message}&nbsp;
          </span>
      </div>

      <div className='inputBlock mt-sm'>
        <h3>Страна</h3>
        <Select
          name='country'
          control={control}
          options={countrySelectOptions}
          placeholder='не выбрано'
          rules={{}}
        />
      </div>

      <div className='inputBlock mt-lg'>
        <h3>Дата рождения</h3>
        <DatePicker
          name="date_of_birth"
          control={control}
          rules={{}}
          minDate={minDate}
          maxDate={maxDate}
        />
      </div>

      <div className='inputBlock mt-lg'>
        <h3>Семейное положение</h3>
        <Select
          name='familystatus'
          control={control}
          options={familyStatusSelectOptions}
          placeholder='не выбрано'
          rules={{}}
        />
      </div>

      <button className='buttonProfileSubmit' type='submit'>
        Сохранить
      </button>

      <div className={cn('modalLoadingErrorMessage', {'visible': isLoading || isError})}>
        {isLoading && <LoadingIcon/>}
        {isError && <ErrorIcon/>}
      </div>
    </form>
  );
};
