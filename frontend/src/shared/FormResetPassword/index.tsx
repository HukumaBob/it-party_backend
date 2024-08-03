import {useEffect} from "react";
import {useForm} from "react-hook-form";
import {useDispatch, useSelector} from "../../app/types/hooks";
import {resetPassword} from '../../app/services/slices/resetPasswordSlice.ts'
import cn from "classnames";
import style from "./index.module.scss";

type TFormData = {
  email: string;
}

export const FormResetPassword = () => {
  const dispatch = useDispatch();
  const {formType} = useSelector(state => state.resetPassword)
  const {email} = useSelector(state => state.profile);

  const {
    register,
    handleSubmit,
    formState: {errors},
    reset,
  } = useForm<TFormData>({mode: "onTouched"});

  useEffect(() => {
    formType === 'profile' && reset({email})
  }, [formType]);

  const onSubmit = (formData: TFormData) => {
    dispatch(resetPassword(formData))
  };

  return (
    <form className={style.form} onSubmit={handleSubmit(onSubmit)}>
      <div className={style.inputBlock}>
        <h3>Email</h3>
        <input
          className={cn({[style.error]: errors.email})}
          type='email'
          placeholder='email@list.ru'
          {...register("email", {
            required: "обязательное поле",
            pattern: {
              value: /^[A-ZА-Я0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "неверный формат почты",
            },
          })}
          disabled={formType === 'profile'}
        />
        <span className={style.errorMessage}>
          {errors?.email?.message}&nbsp;
        </span>
      </div>

      <button className={style.buttonSubmit} type='submit'>
        Сбросить пароль
      </button>
    </form>
  );
};
