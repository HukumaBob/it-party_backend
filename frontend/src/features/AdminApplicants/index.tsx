import dayjs from "dayjs";
import {useAppSelector, useAppDispatch} from "../../app/services/hooks.ts";
import {openModalRejectApplicant, patchAdminApplicantStatus} from "../../app/services/slices/adminApplicantsSlice";
import IconCross from "../../app/assets/icons/close.svg?react";
import IconCheckMark from "../../app/assets/icons/check_mark.svg?react";
import cn from "classnames";
import style from "./index.module.scss";

export const AdminApplicants = () => {
  const data = useAppSelector((store) => store.adminApplicants.data);
  const dispatch = useAppDispatch();

  const handleApprove = (id: number) => {
    const patchData = {
      id: id,
      application_status: 'approved'
    }
    dispatch(patchAdminApplicantStatus(patchData))
  }
  const handleReject = (id: number, fullName: string) => {
    dispatch(openModalRejectApplicant({id, fullName}))
  };

  return (
    <>
      <h2
        className={style.title}>{data[0].event_name}, {dayjs(data[0].event_date).format('D MMMM YYYY')}, {data[0].city_name}</h2>
      <h2 className={style.title}>Заявки на участие в мероприятии</h2>

      <div className={style.table}>
        <div className={style.tableHeader}>
          <h3>Участник</h3>
          <h3>Компания</h3>
          <h3>Должность</h3>
          <h3>Опыт</h3>
          <h3>Статус</h3>
          <h3>Заявка</h3>
        </div>

        {data.map(({profile_events: user, application_status, id}) => (
          <div className={style.tableRow} key={user.id}>
            <p>{user.first_name} {user.last_name}</p>
            <p>{user.place_of_work}</p>
            <p>{user.position}</p>
            <p>{user.experience}</p>
            <p className={cn(style.status, {
              [style.pending]: application_status === 'pending',
              [style.approved]: application_status === 'approved',
              [style.rejected]: application_status === 'rejected',
            })}>
              {{
                pending: 'ожидает',
                approved: 'одобрен',
                rejected: 'отклонен'
              }[application_status]
              }
            </p>
            <div className={style.buttonsBlock}>
              <button
                className={style.button}
                onClick={() => handleReject(id, `${user.first_name} ${user.last_name}`)}>
                <IconCross/>
              </button>
              <button
                className={style.button}
                onClick={() => handleApprove(id)}>
                <IconCheckMark/>
              </button>
            </div>
          </div>
        ))}
      </div>

      <h2 className={style.title}>Отказы</h2>

    </>
  );
};
