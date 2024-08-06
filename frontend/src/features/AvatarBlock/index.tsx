import {useEffect} from "react";
import {useLocation} from "react-router-dom";
import {useDispatch, useSelector} from "../../app/types/hooks";
import {setModalEditAvatar} from "../../app/services/slices/profileUserSlice.ts";
import {ModalEditAvatar} from "../../widgets/ModalEditAvatar";
import {ModalWrapper} from "../../shared/ModalWrapper";
import PhotoCameraIcon from "../../app/assets/icons/photo-camera.svg?react";
import avatarDefault from "../../app/assets/image/other/avatar.webp"
import style from "./index.module.scss";

export const AvatarBlock = () => {
  const dispatch = useDispatch();
  const location = useLocation()
  let {
    modalEditAvatarIsOpen,
    data: {
      first_name,
      last_name,
      user_photo
    }
  } = useSelector(state => state.profileUser);


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
        <PhotoCameraIcon/>
      </button>
      <h2 className={style.title}>{first_name} {last_name}</h2>
      <ModalWrapper isOpen={modalEditAvatarIsOpen} handleClose={handleClose}>
        <ModalEditAvatar/>
      </ModalWrapper>
    </div>
  );
};
