import {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import {useAppDispatch, useAppSelector} from "../../app/services/hooks.ts";
import {updateUserProfile} from "../../app/services/slices/profileSlice.ts";
import LoadingIcon from "../../app/assets/icons/loading.svg?react";
import ErrorIcon from "../../app/assets/icons/error.svg?react";
import cn from "classnames";

type TFormData = {
  "hobby": string;
  "values": string;
  "aims": string;
  "cv": string;
  "motivation": string;
  "online": boolean;
  "offline": boolean;
};

export const FormAboutMe = () => {
  const dispatch = useAppDispatch();
  const [hasFormChanged, setHasFormChanged] = useState(false);
  const [initialValues, setInitialValues] = useState<TFormData | null>(null);
  const {data, statusGetProfile, statusUpdateProfile} = useAppSelector((state) => state.profile);
  const isLoading = [statusGetProfile, statusUpdateProfile].includes('loading');
  const isError = [statusGetProfile, statusUpdateProfile].includes('error');

  const {
    register,
    handleSubmit,
    formState: {errors},
    reset,
    watch
  } = useForm<TFormData>({mode: "onTouched"});

  useEffect(() => {
    if (statusGetProfile === 'success') {
      const initialFormValues = {
        hobby: data.hobby,
        values: data.values,
        aims: data.aims,
        cv: data.cv,
        motivation: data.motivation,
        online: data.online,
        offline: data.offline,
      };
      setInitialValues(initialFormValues);
      reset(initialFormValues);
    }
  }, [statusGetProfile]);

  useEffect(() => {
    const subscription = watch((currentValues) => {
      if (initialValues) {
        const changed = JSON.stringify(initialValues) !== JSON.stringify(currentValues);
        setHasFormChanged(changed);
      }
    });
    return () => subscription.unsubscribe();
  }, [watch, initialValues]);

  const onSubmit = (formData: TFormData) => {
    dispatch(updateUserProfile(formData))
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className='inputBlock'>
        <h3>Хобби</h3>
        <textarea
          className={cn({'error': errors.hobby})}
          placeholder='Напишите о своих увлечениях и хобби'
          maxLength={256}
          {...register("hobby", {
            maxLength: {
              value: 255,
              message: "слишком длинное описание",
            },
          })}
        />
        <span className='errorMessage'>
          {errors?.hobby?.message}&nbsp;
        </span>
      </div>

      <div className='inputBlock'>
        <h3>Ценности</h3>
        <textarea
          className={cn({'error': errors.values})}
          placeholder='Напишите о своих ценностях, жизненной позиции'
          maxLength={256}
          {...register("values", {
            maxLength: {
              value: 255,
              message: "слишком длинное описание",
            },
          })}
        />
        <span className='errorMessage'>
          {errors?.values?.message}&nbsp;
        </span>
      </div>

      <div className='inputBlock'>
        <h3>Цели</h3>
        <textarea
          className={cn({'error': errors.aims})}
          placeholder='Напишите о своих целях и стремлениях'
          maxLength={256}
          {...register("aims", {
            maxLength: {
              value: 255,
              message: "слишком длинное описание",
            },
          })}
        />
        <span className='errorMessage'>
          {errors?.aims?.message}&nbsp;
        </span>
      </div>

      <div className='inputBlock'>
        <h3>Образ жизни</h3>
        <textarea
          className={cn({'error': errors.cv})}
          placeholder='Напишите коротко о себе'
          maxLength={256}
          {...register("cv", {
            maxLength: {
              value: 255,
              message: "слишком длинное описание",
            },
          })}
        />
        <span className='errorMessage'>
          {errors?.cv?.message}&nbsp;
        </span>
      </div>

      <div className='inputBlock'>
        <h3>Мотивация</h3>
        <textarea
          className={cn({'error': errors.motivation})}
          placeholder='Напишите о своей мотивации'
          maxLength={256}
          {...register("motivation", {
            maxLength: {
              value: 255,
              message: "слишком длинное описание",
            },
          })}
        />
        <span className='errorMessage'>
          {errors?.motivation?.message}&nbsp;
        </span>
      </div>

      <h3 className='profileTitle'>Формат мероприятий</h3>
      <label className='profileCheckboxLabel'>
        <input
          className='checkbox'
          type='checkbox'
          {...register('online')}
        />
        Онлайн
      </label>
      <label className='profileCheckboxLabel'>
        <input
          className='checkbox'
          type='checkbox'
          {...register('offline')}
        />
        Оффлайн
      </label>
      <p className='profileSubtitle'>Какой формат мероприятий Вы предпочитаете?</p>

      <button className='buttonProfileSubmit' type='submit' disabled={!hasFormChanged}>
        Сохранить
      </button>

      <div className={cn('modalLoadingErrorMessage', {'visible': isLoading || isError})}>
        {isLoading && <LoadingIcon/>}
        {isError && <ErrorIcon/>}
      </div>
    </form>
  );
};
