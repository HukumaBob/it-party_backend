import Modal from "@mui/material/Modal";
import {useDispatch, useSelector} from "../../app/types/hooks";
import {closeModalSuccess} from "../../app/services/slices/applyRegistrationSlice";
import CloseIcon from "../../app/assets/icons/close.svg?react";
import SuccessIcon from "../../app/assets/icons/successForm.svg?react";
import style from "./index.module.scss";

export const ModalSuccess = () => {
  const dispatch = useDispatch()
  const {isOpenModalSuccess, eventId} = useSelector(state => state.applyRegistration)

  const handleClose = () => {
    dispatch(closeModalSuccess());
  }

  const eventList = useSelector(state => state.eventList.data)
  const event = useSelector(state => state.event.data)
  let title = 'мероприятие'
  const currentEvent = eventList.filter(item => item.id === eventId);
  if (currentEvent.length > 0) {
    title = currentEvent[0].name;
  } else {
    if (Object.keys(event).length > 0) title = event.name;
  }

  return (
    <Modal
      open={isOpenModalSuccess}
      onClose={handleClose}
      aria-labelledby="modal-success"
      aria-describedby="modal-registration-success"
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        '.MuiBackdrop-root': {
          backdropFilter: 'blur(5px)',
        }
      }}
    >
      <div className={style.container}>
        <button onClick={handleClose}><CloseIcon/></button>
        <h2 className={style.title}>Ваша заявка на {title} отправлена</h2>
        <SuccessIcon className={style.successIcon}/>
        <p>Ожидайте ответа по заявке в течение 1-2 дней</p>
        <button onClick={handleClose}>Закрыть</button>
      </div>
    </Modal>
  );
};