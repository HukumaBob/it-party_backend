import {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import {useAppDispatch, useAppSelector} from "../../app/services/hooks.ts";
import {getNotificationList} from "../../app/services/slices/notificationSlice.ts";
import {updateUserProfile} from "../../app/services/slices/profileSlice.ts";
import {Select} from "../../shared/FormFields/Select";
import LoadingIcon from "../../app/assets/icons/loading.svg?react";
import ErrorIcon from "../../app/assets/icons/error.svg?react";
import cn from "classnames";
import style from "./index.module.scss";

type TOption = { value: number; label: string };
type TFormData = {
  "receive_notifications": boolean;
  "notification_email": boolean;
  "notification_sms": boolean;
  "notification_registration_approval": boolean;
  "notification_event": boolean;
  "notification": TOption | null;
};

export const FormNotifications = () => {
  const dispatch = useAppDispatch();
  const [hasFormChanged, setHasFormChanged] = useState(false);
  const [initialValues, setInitialValues] = useState<TFormData | null>(null);
  const {data, statusGetProfile, statusUpdateProfile} = useAppSelector((state) => state.profile);
  const {status: notificationListStatus, notificationSelectOptions} = useAppSelector((state) => state.notification);
  const isLoading = [statusGetProfile, statusUpdateProfile, notificationListStatus].includes('loading');
  const isError = [statusGetProfile, statusUpdateProfile, notificationListStatus].includes('error');

  useEffect(() => {
    notificationListStatus === 'idle' && dispatch(getNotificationList())
  }, [notificationListStatus]);

  const {
    register,
    handleSubmit,
    reset,
    control,
    watch,
  } = useForm<TFormData>({mode: "onTouched"});

  useEffect(() => {
    if (statusGetProfile === 'success' && notificationListStatus === 'success') {
      const getOption = (data: TOption[], target: number | undefined) =>
        data.find((option) => option.value === target) || null;

      const initialFormValues = {
        receive_notifications: data.receive_notifications || false,
        notification_email: data.notification_email || false,
        notification_sms: data.notification_sms || false,
        notification_registration_approval: data.notification_registration_approval || false,
        notification_event: data.notification_event || false,
        notification: getOption(notificationSelectOptions, data.notification),
      };

      setInitialValues(initialFormValues);
      reset(initialFormValues);
    }
  }, [statusGetProfile, notificationListStatus]);

  useEffect(() => {
    const subscription = watch((currentValues) => {
      if (initialValues) {
        // Проверка, изменились ли значения формы, когда уведомления активированы
        const hasActiveChanges = currentValues.receive_notifications &&
          JSON.stringify(initialValues) !== JSON.stringify(currentValues);
        // Проверка, изменилось ли значение флажка "receive_notifications"
        const hasNotificationToggleChanged = currentValues.receive_notifications !== initialValues.receive_notifications;
        const changed = hasActiveChanges || hasNotificationToggleChanged;
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
      notification: formData.notification?.value
    }))
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>

      <div className={style.row}>
        <label className={style.toggleButton}>
          <input type='checkbox' {...register('receive_notifications')}/>
          <span></span>
        </label>
        <h3>получать уведомления</h3>
      </div>

      <div className={cn(style.notificationBlock, {[style.enabled]: watch('receive_notifications')})}>
        <label className='profileCheckboxLabel'>
          <input
            className='checkbox'
            type='checkbox'
            {...register('notification_email')}
          />
          EMAIL уведомления
        </label>
        <label className='profileCheckboxLabel'>
          <input
            className='checkbox'
            type='checkbox'
            {...register('notification_sms')}
          />
          SMS уведомления
        </label>

        <h3 className={cn('profileTitle', style.title)}>Уведомлять меня</h3>
        <label className='profileCheckboxLabel'>
          <input
            className='checkbox'
            type='checkbox'
            {...register('notification_registration_approval')}
          />
          Одобрение заявки
        </label>
        <label className='profileCheckboxLabel'>
          <input
            className='checkbox'
            type='checkbox'
            {...register('notification_event')}
          />
          Новые мероприятия
        </label>

        <div className='inputBlock mt-lg'>
          <h3>Получать уведомления</h3>
          <Select
            name='notification'
            control={control}
            options={notificationSelectOptions}
            placeholder='не выбрано'
            rules={{}}
          />
        </div>
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