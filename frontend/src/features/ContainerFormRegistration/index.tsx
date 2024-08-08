import React, {useEffect} from "react";
import {FormEventRegistration} from "../../widgets/FormEventRegistration";
import {getRegistrationData} from "../../app/services/slices/applyRegistrationSlice";
import {getExperienceList} from "../../app/services/slices/experienceSlice";
import {getStackList} from "../../app/services/slices/stackListSlice";
import {useAppDispatch, useAppSelector} from "../../app/services/hooks.ts";
import loadingSvg from "../../app/assets/icons/loading.svg";
import errorSvg from "../../app/assets/icons/error.svg";

export const ContainerFormRegistration: React.FC<{ id: number }> = ({id}) => {
  const dispatch = useAppDispatch();
  const {status: experienceStatus} = useAppSelector(state => state.experience);
  const {status: stackStatus} = useAppSelector(state => state.stackList)
  const {loadingGET, loadingPOST, error: applyRegistrationError} = useAppSelector(state => state.applyRegistration);

  useEffect(() => {
    dispatch(getRegistrationData(id))
    if (experienceStatus === 'idle' || experienceStatus === 'error') {
      dispatch(getExperienceList())
    }
    if (stackStatus === 'idle' || stackStatus === 'error') {
      dispatch(getStackList())
    }
  }, [dispatch]);

  if (applyRegistrationError || experienceStatus === 'error' || stackStatus === 'error') {
    return <img className='loading-error-icon' src={errorSvg} alt="loading icon"/>
  }
  if (loadingGET || loadingPOST || experienceStatus !== 'success' || stackStatus !== 'success') {
    return <img className='loading-error-icon' src={loadingSvg} alt="loading icon"/>
  }

  return <FormEventRegistration/>
}