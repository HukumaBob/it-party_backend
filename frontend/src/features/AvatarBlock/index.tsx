import {useEffect} from "react";
import {useLocation} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../app/services/hooks.ts";
import {setModalEditAvatar} from "../../app/services/slices/profileSlice.ts";
import {ModalEditAvatar} from "../../widgets/ModalEditAvatar";
import {ModalWrapper} from "../../shared/ModalWrapper";
import PhotoIcon from "../../app/assets/icons/photo.svg?react";
import avatarDefault from "../../app/assets/image/other/avatar.webp"
import style from "./index.module.scss";

export const AvatarBlock = () => {
  const dispatch = useAppDispatch();
  const location = useLocation()
  const {
    modalEditAvatarIsOpen,
    data: {
      first_name,
      last_name,
      user_photo
    }
  } = useAppSelector(state => state.profile);

  const handleClose = () => {
    dispatch(setModalEditAvatar(false));
  }
  const handleOpen = () => {
    dispatch(setModalEditAvatar(true));
  }

  useEffect(() => {
    // закрыть модалку при переходе на другую страницу
    modalEditAvatarIsOpen && handleClose();
  }, [location]);

  return (
    <div className={style.container}>
      <button className={style.avatar} type="button" onClick={handleOpen}>
        <img src={user_photo || avatarDefault} alt="avatar"/>
        <PhotoIcon/>
      </button>
      <h2 className={style.title}>{first_name} {last_name}</h2>
      <ModalWrapper isOpen={modalEditAvatarIsOpen} handleClose={handleClose}>
        <ModalEditAvatar/>
      </ModalWrapper>
    </div>
  );
};
