import React, {useState, ReactElement} from 'react';
import {useForm, useFieldArray} from 'react-hook-form';
// import {useAppDispatch} from "../../app/services/hooks.ts";
// import {deleteGalleryImage} from "../../app/services/slices/adminEditEventSlice.ts";
import {useDropzone, FileRejection} from 'react-dropzone';
import CloseIcon from "../../app/assets/icons/close.svg?react";
import cn from "classnames";
import style from './index.module.scss';
import {ModalConfirmDeleteImage} from "../ModalConfirmDeleteImage";

type FormData = {
  files: { file: File; fileName: string; url: string; caption: string, isServerAsset: boolean, id?: number }[],
  logoIndex: number;
};
type TProps = {
  selectedFiles: FormData;
  setSelectedFiles: (selectedFiles: FormData) => void;
  handleClose: () => void;
};

export const ModalEventEditPhoto: React.FC<TProps> = ({selectedFiles, setSelectedFiles, handleClose}) => {
  // const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: {errors},
    setError,
    clearErrors,
    control
  } = useForm<FormData>({defaultValues: selectedFiles});
  const {
    fields,
    append,
    remove
  } = useFieldArray({control, name: 'files',});

  const [dropAreaError, setDropAreaError] = useState<ReactElement[]>([]);
  const onDrop = (acceptedFiles: File[], fileRejections: FileRejection[]) => {
    const newErrors: ReactElement[] = [];
    const existingFileNames = new Set(fields.map(file => file.fileName));

    // Проверка формата и размера файла:
    if (fileRejections.length > 0) {
      const rejectedErrors = fileRejections.flatMap(({file: {name}, errors}) =>
        errors.map(({code}) => ({
          'file-invalid-type':
            <span
              key={`type-${name}`}><i>{name}</i> - допустимый формат файлов:<i>.jpg</i><i>.jpeg</i><i>.png</i><i>.webp</i></span>,
          'file-too-large': <span key={`size-${name}`}><i>{name}</i> - максимальный размер - 5MB</span>,
        }[code] || <span></span>))
      );
      newErrors.push(...rejectedErrors);
    }

    // Проверка на дубликаты:
    acceptedFiles.forEach(file => {
      if (existingFileNames.has(file.name)) {
        newErrors.push(<span key={`dup-${file.name}`}><i>{file.name}</i> - уже добавлен</span>);
      } else {
        append({
          file,
          fileName: file.name,
          url: URL.createObjectURL(file),
          caption: '',
          isServerAsset: false
        });
      }
    });
    setDropAreaError(newErrors);
    clearErrors('root');
  };
  const {getRootProps, getInputProps} = useDropzone({
    accept: {
      'image/jpeg': ['.jpeg', '.jpg'],
      'image/webp': ['.webp'],
      'image/png': ['.png'],
    },
    maxSize: 5 * 1024 * 1024, // 5MB
    onDrop,
  });

  const onSubmit = (data: FormData) => {
    if (data.files.length < 2) {
      return setError('root.files', {type: 'manual', message: 'добавьте не менее 2 фото'});
    }
    if (data.logoIndex === -1) {
      return setError('root.logoIndex', {type: 'manual', message: 'выберите Logo'});
    }
    setSelectedFiles(data);
    handleClose();
  };
  const handleRemoveFile = async (index: number) => {
    const fileToRemove = fields[index];
    // if (fileToRemove.isServerAsset) {
    //   await setModalConfirm({id: index, isOpen: true});
    //   // dispatch(deleteGalleryImage(id))
    // }
    if (fileToRemove) {
      URL.revokeObjectURL(fileToRemove.url);
      remove(index);
    }
    const currentLogoIndex = Number(watch('logoIndex'));
    if (index === currentLogoIndex) {
      setValue('logoIndex', -1, {shouldValidate: true});
    }
  };
  const handleLogoChange = (index: number) => {
    setValue('logoIndex', index, {shouldValidate: true});
    clearErrors('root.logoIndex');
  };

  const [modalConfirm, setModalConfirm] = useState<{ id?: number, isOpen: boolean }>({isOpen: false});

  return (
    <>
      <div className={style.dropBox} {...getRootProps()}>
        <input {...getInputProps()} />
        <p>Перетащите изображения сюда или<br/>нажмите для выбора файлов</p>
        {...dropAreaError}
      </div>

      <div className={cn(style.previewContainer, {
        [style.single]: fields.length === 1,
        [style.double]: fields.length === 2
      })}>
        {fields.map((fileObj, index) => (
          <div key={fileObj.fileName}>
            <p className={style.fileName}>{fileObj.fileName}</p>

            <div className={style.previewImageContainer}>
              <img className={style.previewImage} src={fileObj.url} alt={`Preview ${fileObj.fileName}`}/>
              <label className={cn(style.checkbox, {[style.error]: errors.root?.logoIndex})}>
                <input
                  className='checkbox'
                  type="radio"
                  {...register('logoIndex')}
                  value={index}
                  checked={Number(watch('logoIndex')) === index}
                  onChange={() => handleLogoChange(index)}
                />
                Logo
              </label>
              <button className={style.removeButton} type="button" onClick={() => handleRemoveFile(index)}>
                <CloseIcon/>
              </button>
              <input
                className={cn(style.captionInput, {[style.error]: errors?.files?.[index]?.caption})}
                type="text"
                placeholder="Введите описание"
                {...register(`files.${index}.caption`, {
                  required: 'добавьте описание',
                  minLength: {value: 3, message: 'не менее 3 символов'},
                  maxLength: {value: 30, message: 'не более 30 символов'},
                })}
              />
            </div>
            <span className={style.errorMessage}>
                {errors?.files?.[index]?.caption?.message}&nbsp;
              </span>
          </div>
        ))}
      </div>

      <div className={style.buttonBlock}>
        <p className={style.formError}>
          {errors?.root?.logoIndex?.message}
          {errors?.root?.files?.message}
          &nbsp;
        </p>
        <button className={style.buttonSubmit} type="button" onClick={handleSubmit(onSubmit)}>Готово</button>
      </div>

      <ModalConfirmDeleteImage
        modalConfirm={modalConfirm}
        setModalConfirm={setModalConfirm}
      />
    </>
  );
};
