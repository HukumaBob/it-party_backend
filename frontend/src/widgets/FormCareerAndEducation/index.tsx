import {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import {useAppDispatch, useAppSelector} from "../../app/services/hooks.ts";
import {getSpecializationsList} from "../../app/services/slices/specializationsSlice.ts";
import {updateUserProfile} from "../../app/services/slices/profileSlice.ts";
import {getExperienceList} from "../../app/services/slices/experienceSlice.ts";
import {getEducationList} from "../../app/services/slices/educationSlice.ts";
import {getIncomeList} from "../../app/services/slices/incomeSlice.ts";
import {Select} from "../../shared/FormFields/Select";
import LoadingIcon from "../../app/assets/icons/loading.svg?react";
import ErrorIcon from "../../app/assets/icons/error.svg?react";
import cn from "classnames";

type TOption = { value: number; label: string };
type TFormData = {
  "place_of_work": string;
  "position": string;
  "experience": TOption | null;
  "specialization": TOption | null;
  "income": TOption | null;
  "education": TOption | null;
};

export const FormCareerAndEducation = () => {
  const dispatch = useAppDispatch();
  const [hasFormChanged, setHasFormChanged] = useState(false);
  const [initialValues, setInitialValues] = useState<TFormData | null>(null);
  const {data, statusGetProfile, statusUpdateProfile} = useAppSelector((state) => state.profile);
  const {specializationsSelectOptions, status: specializationsStatus} = useAppSelector((state) => state.specializations);
  const {experienceSelectOptions, status: experienceStatus} = useAppSelector((state) => state.experience);
  const {educationSelectOptions, status: educationStatus} = useAppSelector((state) => state.education);
  const {incomeSelectOptions, status: incomeStatus} = useAppSelector((state) => state.income);
  const isLoading = [statusGetProfile, statusUpdateProfile, specializationsStatus, educationStatus, incomeStatus, experienceStatus].includes('loading');
  const isError = [statusGetProfile, statusUpdateProfile, specializationsStatus, educationStatus, incomeStatus, experienceStatus].includes('error');

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
    reset,
    watch
  } = useForm<TFormData>({mode: "onTouched"});

  useEffect(() => {
    if (
      statusGetProfile === 'success' &&
      specializationsStatus === 'success' &&
      educationStatus === 'success' &&
      incomeStatus === 'success' &&
      experienceStatus === 'success') {
      const getOption = (data: TOption[], target: number | undefined) =>
        data.find((option) => option.value === target) || null;

      const initialFormValues = {
        place_of_work: data.place_of_work,
        position: data.position,
        experience: getOption(experienceSelectOptions, data.experience),
        specialization: getOption(specializationsSelectOptions, data.specialization),
        income: getOption(incomeSelectOptions, data.income),
        education: getOption(educationSelectOptions, data.education),
      };
      setInitialValues(initialFormValues);
      reset(initialFormValues);
    }
  }, [statusGetProfile, specializationsStatus, educationStatus, incomeStatus]);

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
    setInitialValues(formData);
    setHasFormChanged(false);
    dispatch(updateUserProfile({
      ...formData,
      experience: formData.experience?.value,
      specialization: formData.specialization?.value,
      income: formData.income?.value,
      education: formData.education?.value,
    }))
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className='inputBlock'>
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
