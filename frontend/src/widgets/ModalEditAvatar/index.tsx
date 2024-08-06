import {useEffect, useState} from 'react';
import {useDropzone, DropzoneOptions} from 'react-dropzone';
import {useDispatch, useSelector} from "../../app/types/hooks";
import {setModalEditAvatar, updateUserAvatar} from "../../app/services/slices/profileUserSlice.ts";
import LoadingIcon from "../../app/assets/icons/loading.svg?react";
import ErrorIcon from "../../app/assets/icons/error.svg?react";
import cn from "classnames";
import style from './index.module.scss';

export const ModalEditAvatar = () => {
  const dispatch = useDispatch();
  const {statusUpdateAvatar} = useSelector(state => state.profileUser);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const onDrop = (acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
      setErrorMessage(null);
    }
  };

  const onDropRejected = () => {
    setErrorMessage('допустимый формат jpg, png или webp');
  };

  const dropzoneOptions: DropzoneOptions = {
    accept: {
      'image/jpeg': ['.jpeg', '.jpg'],
      'image/webp': ['.webp'],
      'image/png': ['.png'],
    },
    onDrop,
    onDropRejected,
    multiple: false
  };

  const {getRootProps, getInputProps} = useDropzone(dropzoneOptions);

  const handleUpload = () => {
    if (selectedFile) {
      dispatch(updateUserAvatar(selectedFile))
    }
  };

  useEffect(() => {
    if (statusUpdateAvatar == 'success') {
      dispatch(setModalEditAvatar(false))
    }
  }, [statusUpdateAvatar])

  return (
    <>
      <div className={style.dropBox} {...getRootProps()}>
        <input {...getInputProps()} />
        {selectedFile ?
          <img src={previewUrl || ''} alt="Selected preview" className={style.previewImage}/> :
          <span>Перетащите изображение сюда или<br/>нажмите для выбора файла</span>}
      </div>

      <p className={style.message}>
        <span>{errorMessage}</span>
        {!errorMessage && selectedFile?.name}
        &nbsp;
      </p>

      <button
        className={style.buttonSubmit}
        type='button'
        onClick={handleUpload}
        disabled={Boolean(!selectedFile || (errorMessage && !selectedFile))}>
        Загрузить
      </button>

      <div
        className={cn('modalLoadingErrorMessage', {'visible': statusUpdateAvatar === 'loading' || statusUpdateAvatar === 'error'})}>
        {statusUpdateAvatar === 'loading' && <LoadingIcon/>}
        {statusUpdateAvatar === 'error' && <ErrorIcon/>}
      </div>
    </>
  );
};
