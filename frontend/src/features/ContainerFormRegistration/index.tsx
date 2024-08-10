import React, {useEffect} from "react";
import {FormEventRegistration} from "../../widgets/FormEventRegistration";
import {getRegistrationData} from "../../app/services/slices/applyRegistrationSlice";
import {getExperienceList} from "../../app/services/slices/experienceSlice";
import {getStackList} from "../../app/services/slices/stackListSlice";
import {useAppDispatch, useAppSelector} from "../../app/services/hooks.ts";
import LoadingIcon from "../../app/assets/icons/loading.svg?react";
import ErrorIcon from "../../app/assets/icons/error.svg?react";

export const ContainerFormRegistration: React.FC<{ id: number; name: string }> = ({id, name}) => {
  const dispatch = useAppDispatch();
  const {status: experienceStatus} = useAppSelector(state => state.experience);
  const {status: stackStatus} = useAppSelector(state => state.stackList)
  const {loadingGET, loadingPOST, error: applyRegistrationError} = useAppSelector(state => state.applyRegistration);

  useEffect(() => {
    dispatch(getRegistrationData({id, name}))
    experienceStatus === 'idle' && dispatch(getExperienceList())
    stackStatus === 'idle' && dispatch(getStackList())
  }, [dispatch]);

  if (applyRegistrationError || experienceStatus === 'error' || stackStatus === 'error') {
    return <ErrorIcon className='loading-error-icon'/>
  }
  if (loadingGET || loadingPOST || experienceStatus !== 'success' || stackStatus !== 'success') {
    return <LoadingIcon className='loading-error-icon'/>
  }
  return <FormEventRegistration/>
}