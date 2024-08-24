import React from "react";
import {useAppDispatch, useAppSelector} from "../../app/services/hooks.ts";
import {deleteGalleryImage} from "../../app/services/slices/adminEditEventSlice.ts";
import {ModalWrapper} from "../../shared/ModalWrapper";
import LoadingIcon from "../../app/assets/icons/loading.svg?react";
import ErrorIcon from "../../app/assets/icons/error.svg?react";
import cn from "classnames";
import style from "./index.module.scss";

type TState = { id?: number; isOpen: boolean };
type TProps = {
  modalConfirm: TState;
  setModalConfirm: (modalState: TState) => void;
};

export const ModalConfirmDeleteImage: React.FC<TProps> = ({modalConfirm, setModalConfirm}) => {
  const {isOpen, id} = modalConfirm
  const dispatch = useAppDispatch();
  const {deleteGalleryImageLoading, deleteGalleryImageError} = useAppSelector(state => state.adminEditEvent);
  const handleCloseModal = () => setModalConfirm({isOpen: false});
  const handleDelete = () => id && dispatch(deleteGalleryImage(id));

  return (
    <ModalWrapper isOpen={isOpen} handleClose={handleCloseModal} width={600}>
      <h2 className={style.title}>Удалить <span>сохраненное</span> изображение ?</h2>
      <div className={style.buttonsBlock}>
        <button onClick={handleDelete}>Удалить</button>
        <button onClick={handleCloseModal}>Отмена</button>
      </div>
      <div
        className={cn('modalLoadingErrorMessage', {'visible': deleteGalleryImageLoading || deleteGalleryImageError})}>
        {deleteGalleryImageLoading && <LoadingIcon/>}
        {deleteGalleryImageError && <ErrorIcon/>}
      </div>
    </ModalWrapper>
  );
};
