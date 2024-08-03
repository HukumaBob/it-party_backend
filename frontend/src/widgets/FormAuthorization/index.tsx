import {useState} from "react";
import {Link, useNavigate} from 'react-router-dom';
import {useForm} from "react-hook-form";
import useProfileState from '../../shared/useProfileState';
import Preloader from "../../shared/Preloader";
import {getListCountry} from "../../app/api/api";
import {setUser, setResetOk} from "../../app/services/slices/profileSlice";
import {useDispatch, useSelector} from "../../app/types/hooks";
import {loginUser, registerUsers} from "../../app/services/actions/authorization";
import {receiveProfile, createProfile} from "../../app/services/actions/profile";
import {setModalResetPassword} from "../../app/services/slices/resetPasswordSlice.ts";
import {
  setAuth,
  setError,
  setOk,
  setOpenModal,
  setOpenRegistration
} from "../../app/services/slices/authorization";
import CloseIcon from "../../app/assets/icons/close.svg?react";
import YandexIcon from "../../app/assets/icons/yandex.svg?react";
import EyeIcon from "../../app/assets/icons/eye.svg?react";
import cn from 'classnames';
import style from "./index.module.scss";

type TFormAuthorization = {
  email: string;
  password: string;
  agreement_required?: boolean;
}

export const FormAuthorization = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [passwordIsVisible, setPassowrdIsVisible] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const {handleChange} = useProfileState();

  const handleCloseModal = () => {
    dispatch(setOpenModal(false));
    dispatch(setOpenRegistration(false));
    dispatch(setOk(false));
    dispatch(setResetOk(false));
  };
  const {
    openRegistration,
    error,
    ok,
    data,
    authorizationUser
  } = useSelector((state) => state.authorization);
  const {
    receiveProfileUser,
    resetOk,
  } = useSelector((state) => state.profile);

  const handleOpenRegistration = () => {
    dispatch(setOpenRegistration(!openRegistration));
    dispatch(setError(null));
  };

  const handleUserInfo = () => {
    const dataStorage = localStorage.getItem("updateInfo");
    const data = dataStorage ? JSON.parse(dataStorage) : {};
    if (dataStorage !== undefined && dataStorage !== null) {
      handleChange(data);
      handleRedirectProfile();
    }
  };
  const handleRedirectProfile = () => {
    setLoading(false);
    handleCloseModal();
  };

  const handleResetPassword = () => {
    dispatch(setModalResetPassword({open: true, formType: 'authorization'}));
    handleCloseModal();
  };

  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm<TFormAuthorization>({mode: "onTouched"});

  const onSubmit = (formData: TFormAuthorization) => {
    if (openRegistration) {
      setLoading(true);
      dispatch(registerUsers(formData));
    } else {
      setLoading(true);
      dispatch(loginUser(formData))
        .then((item) => {
          getListCountry()
            .then((countries) => {
              localStorage.setItem('countries', JSON.stringify(countries));
            })
            .catch((err) => {
              setLoading(false);
              console.log(err);
            });
          if (item.payload && authorizationUser) {
            dispatch(
              receiveProfile()
            )
              .then((data) => {
                if (data.payload && receiveProfileUser) {
                  navigate("/profile");
                  handleUserInfo();
                } else {
                  dispatch(
                    createProfile()
                  )
                    .then((data) => {
                      if (data.payload && receiveProfileUser) {
                        navigate("/profile");
                        handleUserInfo();
                      }
                    })
                    .catch((err) => {
                      setLoading(false);
                      console.log(err)
                    });
                }
              })
              .catch((error) => {
                setLoading(false);
                console.log(error);
              });
          } else {
            setLoading(false);
          }
        })
        .catch((error) => {
          setLoading(false);
          console.log(error);
        });
    }
  };

  return (
    <div className={style.container}>
      <button className={style.buttonClose} onClick={handleCloseModal} type='button'>
        <CloseIcon/>
      </button>
      <h2 className={style.title}>
        {openRegistration ? "Регистрация" : (resetOk ? "Сброс пароля" : "Авторизация")}
      </h2>

      {ok && (
        <div className={style.registationTrue}>
          <span>
            Мы отправили письмо вам на почту. Перейдите по ссылке чтобы
            активировать аккаунт.
          </span>
          <p>
            <span>Письмо отправлено на</span>
            <span className={style.registationTrue_email}>{data.email}</span>
          </p>
          <div>
            <button className={style.button} onClick={handleCloseModal}>
              Готово
            </button>
            <button className={style.again}>Выслать еще раз</button>
          </div>
        </div>
      )}

      {ok === false && resetOk === false && (
        <>
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
                {error || errors?.email?.message || '\u200B'}
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
                onClick={() => setPassowrdIsVisible(!passwordIsVisible)} type='button'>
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

            {openRegistration &&
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

            <button
              type='submit'
              className={style.buttonSubmit}
              onClick={() => {
                dispatch(setAuth(true));
                dispatch(setUser(true));
              }}
              disabled={loading}>
              {loading === false ? (openRegistration ? "Зарегистрироваться" : "Войти")
                : <Preloader/>
              }
            </button>

          </form>

          <div className={style.divider}/>
          <button className={style.buttonYandex} type='button'>
            <YandexIcon/>Войти с Яндекс ID
          </button>
          <button className={style.buttonRegister} onClick={handleOpenRegistration} type='button'>
            {openRegistration ? 'Логин' : 'Зарегистрироваться'}
          </button>
        </>
      )}
    </div>
  );
};
