import {useState} from "react";
import {Link} from 'react-router-dom';
import {useForm} from "react-hook-form";
import {useAppDispatch, useAppSelector} from "../../app/services/hooks.ts";
import {
  loginUser,
  createUser,
  setFormType,
  setOpenAuthorizationModal,
} from "../../app/services/slices/authorizationSlice.ts";
import {setModalResetPassword} from "../../app/services/slices/profileResetPasswordSlice.ts";
import YandexIcon from "../../app/assets/icons/yandex.svg?react";
import EyeIcon from "../../app/assets/icons/eye.svg?react";
import LoadingIcon from "../../app/assets/icons/loading.svg?react";
import ErrorIcon from "../../app/assets/icons/error.svg?react";
import cn from 'classnames';
import style from "./index.module.scss";

type TFormData = {
  email: string;
  password: string;
  agreement_required?: boolean;
};

export const FormAuthorization = () => {
  const dispatch = useAppDispatch();
  const [passwordIsVisible, setPasswordIsVisible] = useState<boolean>(false);
  const {formType, formError, statusLogin, statusCreate, createUserIsExist} = useAppSelector((state) => state.authorization);
  const isLoading = [statusLogin, statusCreate].includes('loading');
  const isError = [statusLogin, statusCreate].includes('error') && !formError && !createUserIsExist

  const handleChangeFormType = () => {
    dispatch(setFormType(formType === 'login' ? 'registration' : 'login'));
  };
  const handleCloseModal = () => {
    !isLoading && dispatch(setOpenAuthorizationModal(false));
  };
  const handleResetPassword = () => {
    dispatch(setModalResetPassword({open: true, formType: 'authorization'}));
    handleCloseModal();
  };

  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm<TFormData>({mode: "onTouched"});

  const onSubmit = (formData: TFormData) => {
    formType === 'login' && dispatch(loginUser(formData));
    formType === 'registration' && dispatch(createUser(formData));
  };

  return (
    <>
      <h2 className={style.title}>
        {formType === 'login' ? 'Авторизация' : 'Регистрация'}
      </h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={style.inputBlock}>
          <h3>Email</h3>
          <input
            className={cn({[style.error]: errors.email})}
            type='email'
            placeholder='ivan@ya.ru'
            {...register("email", {
              required: "обязательное поле",
              pattern: {
                value: /^[A-ZА-Я0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "неверный формат почты",
              },
            })}
          />
          <span className={style.errorMessage}>
            {errors?.email?.message || '\u200B'}
          </span>
        </div>

        <div className={style.inputBlock}>
          <h3>Пароль</h3>
          <input
            className={cn({[style.error]: errors.password})}
            type={`${passwordIsVisible ? "text" : "password"}`}
            placeholder={passwordIsVisible ? 'введите пароль' : '************'}
            {...register("password", {
              required: "обязательное поле",
              minLength: {
                value: 8,
                message: "слишком короткий пароль",
              },
              pattern: {
                value: /^(?=.*[A-ZА-Я])(?=.*\d)[A-Za-zА-Яа-я\d._%+-]{8,}$/i,
                message:
                  "пароль должен содержать минимум одну цифру",
              },
            })}
          />
          <button
            className={cn(style.buttonShowPassword, {[style.passwordIsHidden]: !passwordIsVisible})}
            onClick={() => setPasswordIsVisible(!passwordIsVisible)} type='button'>
            <EyeIcon/>
          </button>
          <span className={style.errorMessage}>
            {errors?.password?.message || '\u200B'}
          </span>
        </div>

        <button
          className={style.buttonResetPassword}
          type='button'
          onClick={handleResetPassword}>
          Не помню пароль
        </button>

        {formType === 'registration' &&
          <div className={cn(style.agreementBlock, {[style.errorOutline]: errors.agreement_required})}>
            <input
              className='checkbox'
              type='checkbox'
              {...register('agreement_required', {required: 'соглашение обязательно'})} />
            <p>
              Соглашаюсь с&nbsp;
              <Link to='/'>пользовательским соглашением</Link>
              &nbsp;и&nbsp;
              <Link to='/'>политикой конфиденциальности</Link>
            </p>
            <span className={style.errorMessage}>
              {errors?.agreement_required?.message || '\u200B'}
            </span>
          </div>
        }

        <button type='submit' className={style.buttonSubmit}>
          {formType === 'login' ? 'Войти' : 'Зарегистрироваться'}
        </button>
        <span className={style.errorMessage}>
          {formError}&nbsp;
        </span>
      </form>

      <div className={style.divider}/>
      <button className={style.buttonYandex} type='button'>
        <YandexIcon/>Войти с Яндекс ID
      </button>
      <button className={style.buttonRegister} onClick={handleChangeFormType} type='button'>
        {formType === 'login' ? 'Регистрация' : 'Логин'}
      </button>

      <div className={cn('modalLoadingErrorMessage', {'visible': isLoading || isError})}>
        {isLoading && <LoadingIcon/>}
        {isError && <ErrorIcon/>}
      </div>
    </>
  );
};
