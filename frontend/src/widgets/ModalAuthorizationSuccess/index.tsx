import {useDispatch, useSelector} from "../../app/types/hooks";
import {setOpenAuthorizationSuccessModal} from "../../app/services/slices/authorizationSlice.ts";
import {ModalWrapper} from "../../shared/ModalWrapper/";
import cn from "classnames";
import style from "./index.module.scss";

export const ModalAuthorizationSuccess = () => {
  const dispatch = useDispatch();
  const {userEmail, modalAuthorizationSuccessIsOpen} = useSelector(state => state.authorization);
  const handleCloseModal = () => {
    dispatch(setOpenAuthorizationSuccessModal(false));
  };

  return (
    <ModalWrapper
      isOpen={modalAuthorizationSuccessIsOpen}
      handleClose={handleCloseModal}
    >
      <h2 className={style.title}>Регистрация</h2>
      <p className={style.paragraph}>
        Мы отправили письмо вам на почту. Перейдите по ссылке чтобы активировать аккаунт.
      </p>
      <p className={style.paragraph}>
        Письмо отправлено на
      </p>
      <div className={style.linkBlock}>
        <a href={`mailto:${userEmail}`} target='_blank' rel="noopener noreferrer">
          {userEmail}
        </a>
      </div>
      <button className={style.button} onClick={handleCloseModal}>Готово</button>
      <button className={cn(style.button, style.buttonOutlined)}>Выслать еще раз</button>
    </ModalWrapper>
  );
};
