import React from 'react';
import { useDispatch } from "../../app/types/hooks";
import { TUserProfileValues } from "../../app/types/types";

import {
  setName,
  setSecondName,
  setAvatar,
  setPlaceOfWork,
  setPosition,
  setHobby,
  setValues,
  setAims,
  setCv,
  setPhone,
  setEmail,
  setMotivation,
  setNotification,
  setSelectedMaritalStatus,
  setSelectedProfileExperience,
  setSelectedProfileSpecialization,
  setSelectedIncome,
  setSelectedEducation,
  setChangeDateOfBirth,
  setSelectedCountry,
  setOnlineCheckedFormAboutMe,
  setOfflineCheckedFormAboutMe,
  resetState
} from "../../app/services/slices/profileSlice";

export default function useProfileState() {
  const dispatch = useDispatch();
  const avatarStorage = "http://localhost:8000";

  const handleChange = (data:TUserProfileValues) => {
    if(data.first_name !== null) {
      dispatch(setName(data.first_name));
    };
    if(data.last_name !== null) {
      dispatch(setSecondName(data.last_name));
    };
    if(data.user_photo !== undefined) {
      dispatch(setAvatar(`${avatarStorage}${data.user_photo}`));
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
    if(data.phone !== "") {
      dispatch(setPhone(data.phone));
    };
    if(data.email !== "") {
      dispatch(setEmail(data.email));
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
    if(data.online !== null) {
      dispatch(setOnlineCheckedFormAboutMe(data.online));
    };
    if(data.offline !== null) {
      dispatch(setOfflineCheckedFormAboutMe(data.offline));
    };
    if(data.place_of_work !== "") {
      dispatch(setPlaceOfWork(data.place_of_work));
    };
    if(data.position !== "") {
      dispatch(setPosition(data.position));
    };
    if(data.offline !== null) {
      dispatch(setOfflineCheckedFormAboutMe(data.offline));
    };
    if(data.notification !== null) {
      dispatch(setNotification(data.notification));
    };
  };

  const resetForm = () => {
    dispatch(resetState());
  };

  return { handleChange, resetForm };
};