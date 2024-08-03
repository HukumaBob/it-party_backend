import {useEffect} from "react";
import {useForm} from "react-hook-form";
import {useDispatch, useSelector} from "../../app/types/hooks";
import {getSpecializationsList} from "../../app/services/slices/specializationsSlice.ts";
import {updateUserProfile} from "../../app/services/slices/profileUserSlice.ts";
import {getEducationList} from "../../app/services/slices/educationSlice.ts";
import {getIncomeList} from "../../app/services/slices/incomeSlice.ts";
import {Select} from "../../shared/FormFields/Select";
import LoadingIcon from "../../app/assets/icons/loading.svg?react";
import ErrorIcon from "../../app/assets/icons/error.svg?react";
import cn from "classnames";
import {getExperienceList} from "../../app/services/slices/experienceSlice.ts";

type TOption = { value: number; label: string };
type TFormData = {
  "place_of_work": string;
  "position": string;
  "experience": TOption;
  "specialization": TOption;
  "income": TOption;
  "education": TOption;
};

export const FormCareerAndEducation = () => {
  const dispatch = useDispatch();
  const {data, statusGetProfile} = useSelector((state) => state.profileUser);
  const {specializationsSelectOptions, status: specializationsStatus} = useSelector((state) => state.specializations);
  const {experienceSelectOptions, status: experienceStatus} = useSelector((state) => state.experience);
  const {educationSelectOptions, status: educationStatus} = useSelector((state) => state.education);
  const {incomeSelectOptions, status: incomeStatus} = useSelector((state) => state.income);
  const isLoading = [statusGetProfile, specializationsStatus, educationStatus, incomeStatus, experienceStatus].includes('loading');
  const isError = [statusGetProfile, specializationsStatus, educationStatus, incomeStatus, experienceStatus].includes('error');

  useEffect(() => {
    specializationsStatus === 'idle' && dispatch(getSpecializationsList());
    experienceStatus === 'idle' && dispatch(getExperienceList())
    educationStatus === 'idle' && dispatch(getEducationList());
    incomeStatus === 'idle' && dispatch(getIncomeList());
  }, [specializationsStatus, experienceStatus, educationStatus, incomeStatus]);

  const {
    register,
    handleSubmit,
    formState: {errors},
    control,
    reset
  } = useForm<TFormData>({mode: "onTouched"});

  useEffect(() => {
    if (
      statusGetProfile === 'success' &&
      specializationsStatus === 'success' &&
      educationStatus === 'success' &&
      incomeStatus === 'success' &&
      experienceStatus === 'success') {
      const getOption = (data: TOption[], target: number | undefined) =>
        data.find((option) => option.value === target) || {};

      reset({
        place_of_work: data.place_of_work,
        position: data.position,
        experience: getOption(experienceSelectOptions, data.experience),
        specialization: getOption(specializationsSelectOptions, data.specialization),
        income: getOption(incomeSelectOptions, data.income),
        education: getOption(educationSelectOptions, data.education),
      });
    }
  }, [statusGetProfile, specializationsStatus, educationStatus, incomeStatus]);

  const onSubmit = (formData: TFormData) => {
    dispatch(updateUserProfile({
      ...formData,
      experience: formData.experience.value,
      specialization: formData.specialization.value,
      income: formData.income.value,
      education: formData.education.value,
    }))
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2 className='profileTitle'>Карьера и образование</h2>

      <div className='inputBlock mt-lg'>
        <h3>Место работы</h3>
        <input
          className={cn({'error': errors.place_of_work})}
          type='text'
          placeholder='Укажите место вашей работы'
          {...register("place_of_work", {
            minLength: {
              value: 2,
              message: "слишком короткое название",
            }
          })}
        />
        <span className='errorMessage'>
            {errors?.place_of_work?.message}&nbsp;
          </span>
      </div>

      <div className='inputBlock mt-sm'>
        <h3>Должность</h3>
        <input
          className={cn({'error': errors.position})}
          type='text'
          placeholder='Укажите вашу должность'
          {...register("position", {
            minLength: {
              value: 2,
              message: "слишком короткое название",
            }
          })}
        />
        <span className='errorMessage'>
            {errors?.position?.message}&nbsp;
          </span>
      </div>

      <div className='inputBlock mt-sm'>
        <h3>Ваш опыт работы</h3>
        <Select
          name='experience'
          control={control}
          options={experienceSelectOptions}
          placeholder='не выбрано'
          rules={{}}
        />
      </div>

      <div className='inputBlock mt-md'>
        <h3>Ваше направление</h3>
        <Select
          name='specialization'
          control={control}
          options={specializationsSelectOptions}
          placeholder='не выбрано'
          rules={{}}
        />
      </div>

      <div className='inputBlock mt-md'>
        <h3>Доход</h3>
        <Select
          name='income'
          control={control}
          options={incomeSelectOptions}
          placeholder='не выбрано'
          rules={{}}
        />
      </div>

      <div className='inputBlock mt-md'>
        <h3>Образование</h3>
        <Select
          name='education'
          control={control}
          options={educationSelectOptions}
          placeholder='не выбрано'
          rules={{}}
        />
      </div>

      <button type='submit' className='buttonProfileSubmit'>
        Сохранить
      </button>

      <div className={cn('modalLoadingErrorMessage', {'visible': isLoading || isError})}>
        {isLoading && <LoadingIcon/>}
        {isError && <ErrorIcon/>}
      </div>
    </form>
  );
};
