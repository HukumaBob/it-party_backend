import {useEffect} from "react";
import {useForm} from "react-hook-form";
import {useDispatch, useSelector} from "../../app/types/hooks";
import {updateUserProfile} from "../../app/services/slices/profileUserSlice.ts";
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
  const dispatch = useDispatch();
  const {data, statusGetProfile} = useSelector((state) => state.profileUser);

  const {
    register,
    handleSubmit,
    formState: {errors},
    reset
  } = useForm<TFormData>({mode: "onTouched"});

  useEffect(() => {
    if (statusGetProfile === 'success') {
      reset({
        hobby: data.hobby,
        values: data.values,
        aims: data.aims,
        cv: data.cv,
        motivation: data.motivation,
        online: data.online,
        offline: data.offline,
      });
    }
  }, [statusGetProfile]);

  const onSubmit = (formData: TFormData) => {
    dispatch(updateUserProfile(formData))
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2 className='profileTitle'>Это поможет подобрать вам ивенты</h2>

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

      <h2 className='profileTitle'>Формат мероприятий</h2>
      <p className='profileSubtitle'>Какой формат мероприятий вы предпочитаете?</p>
      <label className='profileCheckboxLabel'>
        <input
          className='checkbox'
          type='checkbox'
          {...register('online')}
          name='online'/>
        Онлайн
      </label>
      <label className='profileCheckboxLabel'>
        <input
          className='checkbox'
          type='checkbox'
          {...register('offline')}
          name='offline'/>
        Оффлайн
      </label>

      <button type='submit' className='buttonProfileSubmit'>
        Сохранить
      </button>

      <div
        className={cn('modalLoadingErrorMessage', {'visible': statusGetProfile === 'loading' || statusGetProfile === 'error'})}>
        {statusGetProfile === 'loading' && <LoadingIcon/>}
        {statusGetProfile === 'error' && <ErrorIcon/>}
      </div>
    </form>
  );
};
