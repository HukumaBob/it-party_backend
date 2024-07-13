import Modal from "@mui/material/Modal";
import {useForm} from "react-hook-form";
import {useSelector, useDispatch} from "../../app/types/hooks";
import {patchAdminApplicantStatus, closeModalRejectApplicant} from "../../app/services/slices/adminApplicantsSlice";
import {Select} from "../../shared/FormFields/Select";
import {ReactComponent as IconCross} from "../../app/assets/icons/close.svg";
import cn from "classnames";
import style from "./index.module.scss";

type TFormValues = {
  explanation: {
    value: number;
    label: string;
  };
};

export const ModalRejectApplicant = () => {
  const dispatch = useDispatch();
  const {
    isModalRejectApplicantOpen,
    applicantStatusId,
    applicantFullName
  } = useSelector((store) => store.adminApplicants);

  const handleClose = () => {
    dispatch(closeModalRejectApplicant())
  }

  const {
    register,
    handleSubmit,
    formState: {errors},
    reset,
    watch,
    control,
    trigger,
  } = useForm<TFormValues>({mode: 'onTouched'});

  const optionsExplanation = [
    {value: 1, label: "причина номер один"},
    {value: 2, label: "причина номер два"},
    {value: 3, label: "причина номер три"},
    {value: 4, label: "причина номер четыре"},
  ]

  const onSubmit = (data: TFormValues) => {
    const patchData = {
      id: applicantStatusId!,
      application_status: 'rejected',
      explanation: data.explanation.label,
    }
    dispatch(patchAdminApplicantStatus(patchData));
    handleClose()
  }

  return (
    <Modal
      open={isModalRejectApplicantOpen}
      onClose={handleClose}
      aria-labelledby="modal-success"
      aria-describedby="modal-registration-success"
      sx={{'.MuiBackdrop-root': {backdropFilter: 'blur(5px)'}}}
    >
      <div className={style.wrapper}>
        <div className={style.container}>
          <form className={style.form} onSubmit={handleSubmit(onSubmit)}>
            <button onClick={handleClose}><IconCross/></button>
            <h2>Укажите причину отказа пользователю: {applicantFullName}</h2>
            <Select
              name='explanation'
              control={control}
              options={optionsExplanation}
              placeholder='не выбрано'
              rules={{required: 'не выбрана причина отказа'}}
            />
            <span className={style.errorMessage}>
          {errors?.explanation?.message || '\u200B'}
        </span>
            <button type='submit'>Отправить</button>
          </form>
        </div>
      </div>
    </Modal>
  );
};
