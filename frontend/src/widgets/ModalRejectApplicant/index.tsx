import Modal from "@mui/material/Modal";
import {useForm} from "react-hook-form";
import {useAppSelector, useAppDispatch} from "../../app/services/hooks.ts";
import {patchAdminApplicantStatus, closeModalRejectApplicant} from "../../app/services/slices/adminApplicantsSlice";
import {Select} from "../../shared/FormFields/Select";
import CrossIcon from "../../app/assets/icons/close.svg?react";
import style from "./index.module.scss";

type TFormValues = {
  explanation: {
    value: number;
    label: string;
  };
};

export const ModalRejectApplicant = () => {
  const dispatch = useAppDispatch();
  const {
    isModalRejectApplicantOpen,
    applicantStatusId,
    applicantFullName
  } = useAppSelector((store) => store.adminApplicants);

  const handleClose = () => {
    dispatch(closeModalRejectApplicant())
  }

  const {
    handleSubmit,
    formState: {errors},
    control,
  } = useForm<TFormValues>({mode: 'onTouched'});

  const optionsExplanation = [
    {value: "Недостаток опыта", label: "Недостаток опыта"},
    {value: "Неподходящее образование", label: "Неподходящее образование"},
    {value: "Недостаток технических навыков", label: "Недостаток технических навыков"},
    {value: "Не подходит по культуре компании", label: "Не подходит по культуре компании"},
    {value: "Низкий уровень английского языка", label: "Низкий уровень английского языка"},
    {value: "Плохие результаты тестового задания", label: "Плохие результаты тестового задания"},
    {value: "Недостаток лидерских качеств", label: "Недостаток лидерских качеств"},
    {value: "Слишком высокая зарплатная претензия", label: "Слишком высокая зарплатная претензия"},
    {value: "Неудовлетворительные рекомендации", label: "Неудовлетворительные рекомендации"},
    {value: "Неполное резюме", label: "Неполное резюме"},
    {value: "Отсутствие необходимых сертификатов", label: "Отсутствие необходимых сертификатов"},
    {value: "Переполненный штат", label: "Переполненный штат"},
    {value: "Некорректное поведение на собеседовании", label: "Некорректное поведение на собеседовании"},
    {value: "Несоответствие требованиям должности", label: "Несоответствие требованиям должности"},
    {value: "Отсутствие гибкости в графике работы", label: "Отсутствие гибкости в графике работы"},
    {value: "Отказ от выполнения тестового задания", label: "Отказ от выполнения тестового задания"},
    {value: "Невозможность переезда", label: "Невозможность переезда"},
    {value: "Плохая мотивация", label: "Плохая мотивация"},
  ];

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
      sx={{'.MuiBackdrop-root': {backdropFilter: 'blur(3px)'}}}
    >
      <div className={style.wrapper}>
        <div className={style.container}>
          <form className={style.form} onSubmit={handleSubmit(onSubmit)}>
            <button onClick={handleClose}><CrossIcon/></button>
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
