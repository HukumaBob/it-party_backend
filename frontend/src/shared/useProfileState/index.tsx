import React from 'react';
import { useDispatch } from "../../app/types/hooks";
import { TUserProfileValues } from "../../app/types/types";

import {
  setName,
  setSecondName,
  setAvatar,
  setHobby,
  setValues,
  setAims,
  setCv,
  setMotivation,
  setSelectedMaritalStatus,
  setSelectedProfileExperience,
  setSelectedProfileSpecialization,
  setSelectedIncome,
  setSelectedEducation,
  setChangeDateOfBirth,
  setSelectedCountry,
} from "../../app/services/slices/profileSlice";

export default function useProfileState() {
  const dispatch = useDispatch();

  const handleChange = (data:TUserProfileValues) => {
    if(data.first_name !== "") {
      dispatch(setName(data.first_name));
    };
    if(data.last_name !== "") {
      dispatch(setSecondName(data.last_name));
    };
    if(data.user_photo !== "") {
      dispatch(setAvatar(data.user_photo));
    };
    if(data.date_of_birth !== "") {
      dispatch(setChangeDateOfBirth(data.date_of_birth));
    };
    if(data.hobby !== "") {
      dispatch(setHobby(data.hobby));
    };
    if(data.values !== "") {
      dispatch(setValues(data.values));
    };
    if(data.aims !== "") {
      dispatch(setAims(data.aims));
    };
    if(data.cv !== "") {
      dispatch(setCv(data.cv));
    };
    if(data.motivation !== "") {
      dispatch(setMotivation(data.motivation));
    };
    if(data.specialization !== null) {
      dispatch(setSelectedProfileSpecialization(data.specialization));
    };
    if(data.experience !== null) {
      dispatch(setSelectedProfileExperience(data.specialization));
    };
    if(data.familystatus !== null) {
      dispatch(setSelectedMaritalStatus(data.familystatus));
    };
    if(data.education !== null) {
      dispatch(setSelectedEducation(data.education));
    };
    if(data.income !== null) {
      dispatch(setSelectedIncome(data.income));
    };
    if(data.country !== null) {
      dispatch(setSelectedCountry(data.country));
    };
  };

  return { handleChange };
};