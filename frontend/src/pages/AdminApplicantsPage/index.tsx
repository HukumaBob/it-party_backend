import React, {useEffect} from "react";
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "../../app/types/hooks";
import {closeModalRejectApplicant, getAdminApplicantsList} from "../../app/services/slices/adminApplicantsSlice";
import {AdminApplicants} from "../../features/AdminApplicants";
import banner from "../../app/assets/image/other/admin_banner_applicants.webp";
import {ReactComponent as LoadingIcon} from "../../app/assets/icons/loading.svg";
import {ReactComponent as ErrorIcon} from "../../app/assets/icons/error.svg";
import style from "./index.module.scss";

export const AdminApplicantsPage = () => {
  const {id} = useParams()
  const {loading, error} = useSelector(state => state.adminApplicants)
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAdminApplicantsList(Number(id)))
  }, [dispatch]);

  useEffect(() => () => {
    // закрыть модалку если покидаем страницу
    dispatch(closeModalRejectApplicant())
  }, [dispatch]);

  return (
    <>
      <img className={style.banner} src={banner} alt='banner'/>
      <div className='container'>
        {loading && <LoadingIcon className='loading-error-icon'/>}
        {error && <ErrorIcon className='loading-error-icon'/>}
        {!loading && !error && <AdminApplicants/>}
      </div>
    </>
  );
};
