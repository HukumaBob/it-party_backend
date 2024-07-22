import {useEffect} from "react";
import {useForm} from "react-hook-form";
import dayjs from "dayjs";
import {useDispatch, useSelector} from "../../app/types/hooks";
import {applyRegistration} from "../../app/services/slices/applyRegistrationSlice";
import {AccordionRegistration} from "../../entities/AccordionRegistration";
import {Select} from "../../shared/FormFields/Select";
import {DatePicker} from "../../shared/FormFields/DatePicker";
import cn from "classnames";
import style from "./index.module.scss";

type TOption = {
  value: number;
  label: string;
}

type TFormValues = {
  first_name: string;
  last_name: string;
  date_of_birth: string | null;
  email: string;
  phone: string;
  place_of_work: string;
  position: string;
  experience: TOption;
  specialization: TOption;
  agreement: boolean;
  agreementPromotion: boolean;
  online: boolean;
  offline: boolean;
  languages: number[];
};

export const FormApplyRegistration = () => {
  const dispatch = useDispatch();
  const {inboundData} = useSelector(state => state.applyRegistration);
  const {data: experienceData, optionsExperience} = useSelector(state => state.experience);
  const {optionsSpecialization, optionsStack} = useSelector(state => state.stackList)

  const {
    register,
    handleSubmit,
    formState: {errors},
    reset,
    watch,
    control,
    trigger,
  } = useForm<TFormValues>({mode: 'onTouched'});

  useEffect(() => {
    // вставка начальных значений в форму:
    if (inboundData && experienceData) {
      const initialData: Record<string, any> = {
        "first_name": inboundData.first_name,
        "last_name": inboundData.last_name,
        "date_of_birth": inboundData.date_of_birth ? dayjs(inboundData.date_of_birth) : null,
        "place_of_work": inboundData.place_of_work,
        "position": inboundData.position,
        "phone": inboundData.phone,
        "online": inboundData.online,
        "offline": inboundData.offline,
        "specialization": inboundData.specialization ? optionsSpecialization[inboundData.specialization] : null,
        "experience": inboundData.experience ? optionsExperience[inboundData.experience] : null
      }
      reset(initialData)
    }
  }, [inboundData, experienceData]);

  const onSubmit = (data: TFormValues) => {
    // отправка данных:
    if (inboundData) {
      const formData = {
        ...data,
        "date_of_birth": dayjs(data.date_of_birth).format('YYYY-MM-DD'),
        "specialization": data.specialization.value,
        "experience": data.experience!.value,
      };
      dispatch(applyRegistration({id: inboundData.user_event_id, ...formData}))
    }
  };

  // валидаторы чекбоксы online-offline:
  const validateOnlineOffline = () => {
    if (!watch('online') && !watch('offline')) {
      return 'Хотя бы один формат должен быть выбран';
    }
    return true;
  };
  const handleCheckboxChange = () => {
    trigger(['online', 'offline']);
  };

  // Рендеринг чекбоксов - языки:
  let selectedSpecializations: TOption[] = []
  if (watch().specialization) {
    let selectedSpecializationValue = watch().specialization.value
    selectedSpecializations = optionsStack[selectedSpecializationValue]
  }

  const today = dayjs();
  const minDate = today.subtract(100, 'year');
  const maxDate = today.subtract(10, 'year');

  return (
    <form className={style.form} onSubmit={handleSubmit(onSubmit)}>
      <AccordionRegistration
        title='Персональные данные'
        isError={Boolean(errors?.first_name || errors?.last_name || errors?.date_of_birth)}
      >
        <div className={style.inputBlock}>
          <h3>Имя</h3>
          <input
            className={cn(style.input, {[style.error]: errors.first_name})}
            type='text'
            placeholder='Иван'
            {...register('first_name', {
              required: 'обязательное поле',
              minLength: {
                value: 2,
                message: 'слишком короткое имя',
              },
              pattern: {
                value: /^[A-ZА-Я]+$/i,
                message: 'некорректный формат имени',
              },
            })}
          />
          <span className={style.errorMessage}>
            {errors?.first_name?.message || '\u200B'}
          </span>
        </div>

        <div className={style.inputBlock}>
          <h3>Фамилия</h3>
          <input
            className={cn(style.input, {[style.error]: errors.last_name})}
            type='text'
            placeholder='Иванов'
            {...register('last_name', {
              required: 'обязательное поле',
              minLength: {
                value: 2,
                message: 'слишком короткая фамилия',
              },
              pattern: {
                value: /^[A-ZА-Я]+$/i,
                message: 'некорректный формат фамилии',
              },
            })}
          />
          <span className={style.errorMessage}>
            {errors?.last_name?.message || '\u200B'}
          </span>
        </div>

        <div className={style.inputBlock}>
          <h3>Дата рождения</h3>
          <DatePicker
            name="date_of_birth"
            control={control}
            rules={{required: 'обязательное поле'}}
            minDate={minDate}
            maxDate={maxDate}
          />
          <span className={style.errorMessage}>
            {errors.date_of_birth?.message || '\u200B'}
          </span>
        </div>
      </AccordionRegistration>

      <AccordionRegistration
        title='Контакты'
        isError={Boolean(errors?.email || errors?.phone)}
      >
        <div className={style.inputBlock}>
          <h3>Email</h3>
          <input
            className={cn(style.input, {[style.error]: errors.email})}
            type='email'
            placeholder='ivanoff@gmail.com'
            {...register('email', {
              required: 'обязательное поле',
              pattern: {
                value: /^[A-ZА-Я0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'неверный формат электронной почты',
              },
            })}
          />
          <span className={style.errorMessage}>
            {errors?.email?.message || '\u200B'}
          </span>
        </div>

        <div className={style.inputBlock}>
          <h3>Номер телефона</h3>
          <input
            className={cn(style.input, {[style.error]: errors.phone})}
            type='tel'
            placeholder='8 800 555 25 25'
            {...register('phone', {
              required: 'обязательное поле',
              minLength: {
                value: 11,
                message: 'некорректный формат номера',
              },
            })}
          />
          <span className={style.errorMessage}>
            {errors?.phone?.message || '\u200B'}
          </span>
        </div>
      </AccordionRegistration>

      <AccordionRegistration
        title='Работа'
        isError={Boolean(errors?.place_of_work || errors?.position || errors?.experience || errors?.specialization)}
      >
        <div className={style.inputBlock}>
          <h3>Место работы</h3>
          <input
            className={cn(style.input, {[style.error]: errors.place_of_work})}
            type='text'
            placeholder='Yandex Tech'
            {...register('place_of_work', {
              required: 'обязательное поле',
              minLength: {
                value: 2,
                message: 'слишком короткое название',
              },
              pattern: {
                value: /^[A-ZА-Я0-9 -]+$/i,
                message: 'некорректное название',
              },
            })}
          />
          <span className={style.errorMessage}>
            {errors?.place_of_work?.message || '\u200B'}
          </span>
        </div>

        <div className={style.inputBlock}>
          <h3>Должность</h3>
          <input
            className={cn(style.input, {[style.error]: errors.position})}
            type='text'
            placeholder='Frontend Developer'
            {...register('position', {
              required: 'обязательное поле',
              minLength: {
                value: 2,
                message: 'слишком короткое название',
              },
              pattern: {
                value: /^[A-ZА-Я0-9 ]+$/i,
                message: 'некорректное название',
              },
            })}
          />
          <span className={style.errorMessage}>
            {errors?.position?.message || '\u200B'}
          </span>
        </div>

        <div className={style.inputBlock}>
          <h3>Ваш опыт работы</h3>
          <Select
            name='experience'
            control={control}
            options={Object.values(optionsExperience)}
            placeholder='не выбран'
            rules={{required: 'обязательное поле'}}
          />
          <span className={style.errorMessage}>
            {errors?.experience?.message || '\u200B'}
          </span>
        </div>

        <div className={style.inputBlock}>
          <h3>Ваше направление</h3>
          <Select
            name='specialization'
            control={control}
            options={Object.values(optionsSpecialization)}
            placeholder='не выбран'
            rules={{required: 'обязательное поле'}}
          />
          <span className={style.errorMessage}>
            {errors?.specialization?.message || '\u200B'}
          </span>
        </div>

        <div className={cn(style.checkboxContainer, style.marginBottom)}>
          {selectedSpecializations.map(({value, label}) => (
            <label key={value}>
              <input
                className='checkbox'
                type='checkbox'
                {...register('languages', {required: false})}
                value={value}
                name='languages'/>
              {label}
            </label>
          ))}
        </div>

      </AccordionRegistration>

      <AccordionRegistration
        title='Формат участия'
        isError={Boolean(errors.online)}
      >
        <div className={cn(style.onlineOfflineContainer, style.checkboxContainer)}>
          <h3>Формат</h3>
          <label>
            <input
              className='checkbox'
              type='checkbox'
              {...register('online', {
                validate: validateOnlineOffline,
                onChange: handleCheckboxChange
              })}
            />
            Онлайн
          </label>
          <label>
            <input
              className='checkbox'
              type='checkbox'
              {...register('offline', {
                validate: validateOnlineOffline,
                onChange: handleCheckboxChange
              })}
            />
            Оффлайн
          </label>
          <span className={style.errorMessage}>
            {errors?.online?.message || '\u200B'}
          </span>
        </div>
      </AccordionRegistration>

      <div className={cn(style.agreement, style.agreementTop, {[style.errorOutline]: errors.agreement})}>
        <input className='checkbox' type='checkbox' {...register('agreement', {required: true})} />
        <p>
          Я даю свое согласие на передачу в ООО «ЯНДЕКС» анкеты, содержащей
          мой персональные данные, и согласен с тем, что они будут храниться
          в ООО «ЯНДЕКС» в течение 10 лет и будут использованы исключительно
          для целей приглашения меня к участию в мероприятиях группы
          компаний «ЯНДЕКС», в соответствии с Федеральным законом «о
          персональных данных».
        </p>
        <span className={style.errorMessage}>
          {errors.agreement ? 'соглашение обязательно' : '\u200B'}
        </span>
      </div>

      <div className={style.agreement}>
        <input className='checkbox' type='checkbox' {...register('agreementPromotion')} />
        <p>
          Я даю свое согласие на передачу в ООО «ЯНДЕКС» резюме и/или
          анкеты, содержащих мои персональные данные, и согласен с тем, что
          они будут храниться в ООО «ЯНДЕКС» в течение 10 лет и будут
          обрабатываться исключительно для целей предложения мне вакансий
          группы компаний «ЯНДЕКС», в соответствии с Федеральным законом «О
          персональных данных».
        </p>
      </div>

      <button type='submit' className={style.submitButton}>
        Зарегистрироваться
      </button>

    </form>
  );
};
