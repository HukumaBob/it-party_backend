import {useEffect} from "react";
import {useForm} from "react-hook-form";
import {useDispatch, useSelector} from "../../app/types/hooks";
import {resetPassword} from '../../app/services/slices/resetPasswordSlice.ts'
import cn from "classnames";

type TFormData = { email: string }

export const FormResetPassword = () => {
  const dispatch = useDispatch();
  const {formType} = useSelector(state => state.resetPassword)
  const {email} = useSelector(state => state.profileUser.data);

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
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className='inputBlock sm'>
        <h3>Email</h3>
        <input
          className={cn({'error': errors.email})}
          type='email'
          placeholder='ivanov@gmail.com'
          {...register("email", {
            required: "обязательное поле",
            pattern: {
              value: /^[A-ZА-Я0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "неверный формат почты",
            },
          })}
          disabled={formType === 'profile'}
        />
        <span className='errorMessage'>
          {errors?.email?.message}&nbsp;
        </span>
      </div>

      <button className='buttonSubmit' type='submit'>
        Сбросить пароль
      </button>
    </form>
  );
};
