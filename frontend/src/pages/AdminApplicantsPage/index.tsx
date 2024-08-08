import {useEffect} from "react";
import {useParams} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../app/services/hooks.ts";
import {closeModalRejectApplicant, getAdminApplicantsList} from "../../app/services/slices/adminApplicantsSlice";
import {AdminApplicants} from "../../features/AdminApplicants";
import banner from "../../app/assets/image/other/admin_banner_applicants.webp";
import LoadingIcon from "../../app/assets/icons/loading.svg?react";
import ErrorIcon from "../../app/assets/icons/error.svg?react";
import style from "./index.module.scss";

export const AdminApplicantsPage = () => {
  const {id} = useParams()
  const {loading, error} = useAppSelector(state => state.adminApplicants)
  const dispatch = useAppDispatch();

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
