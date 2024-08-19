import React, {useState, ReactElement, useEffect} from 'react';
import {useForm} from 'react-hook-form';
import {useDropzone, FileRejection} from 'react-dropzone';
import CloseIcon from "../../app/assets/icons/close.svg?react";
import cn from "classnames";
import style from './index.module.scss';

type FileWithMetadata = {
  file: File;
  fileName: string;
  fieldName: string;
  url: string;
  caption: string;
};
type TProps = {
  selectedFiles: FileWithMetadata[];
  setSelectedFiles: (selectedFiles: FileWithMetadata[]) => void;
  logo: string;
  setLogo: (logo: string) => void;
  handleClose: () => void;
  setFilesError: (value: boolean) => void;
};
type TFormData = { [fieldName: string]: string };

export const ModalEditEventPhoto: React.FC<TProps> =
  ({selectedFiles, setSelectedFiles, logo, setLogo, handleClose, setFilesError}) => {
    const [files, setFiles] = useState<FileWithMetadata[]>(selectedFiles);
    const [dropAreaError, setDropAreaError] = useState<ReactElement[]>([]);
    const [formError, setFormError] = useState<string | undefined>(undefined);
    const {register, handleSubmit, formState: {errors}} = useForm<TFormData>();

    const onDrop = (acceptedFiles: File[], fileRejections: FileRejection[]) => {
      const newErrors: ReactElement[] = [];
      const existingFileNames = new Set(files.map(file => file.fileName));

      // Проверка формата и размера файла:
      if (fileRejections.length > 0) {
        const rejectedErrors = fileRejections.flatMap(({file, errors}) =>
          errors.map(({code}) => ({
            'file-invalid-type': <span
              key={`type-${file.name}`}><i>{file.name}</i> - допустимый формат файлов:<i>.jpg</i><i>.jpeg</i><i>.png</i><i>.webp</i></span>,
            'file-too-large': <span key={`size-${file.name}`}><i>{file.name}</i> - максимальный размер - 5MB</span>,
          }[code] || <span></span>))
        );
        newErrors.push(...rejectedErrors);
      }

      // Проверка на дубликаты:
      const newFiles: FileWithMetadata[] = [];
      acceptedFiles.forEach(file => {
        if (existingFileNames.has(file.name)) {
          newErrors.push(<span key={`dup-${file.name}`}><i>{file.name}</i> - уже добавлен</span>);
        } else {
          const safeFieldName = file.name.replace(/\./g, '_');
          newFiles.push({
            file,
            fileName: file.name,
            fieldName: safeFieldName,
            url: URL.createObjectURL(file),
            caption: '',
          });
        }
      });

      setDropAreaError(newErrors);
      newFiles.length > 0 && setFiles(prevFiles => [...prevFiles, ...newFiles]);
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

    useEffect(() => {
      files.length > 1 && setFormError(undefined);
    }, [files]);

    const handleSelectLogo = (fileName: string) => {
      setLogo(fileName);
      setFormError(undefined);
    };

    const onSubmit = (data: TFormData) => {
      if (files.length < 2) return setFormError('добавьте не менее 2 фото');
      if (!logo) return setFormError('выберите Logo');
      const updatedFiles = files.map(file => ({
        ...file,
        caption: data[file.fieldName] || file.caption,
      }));
      setSelectedFiles(updatedFiles);
      setFilesError(false);
      handleClose();
    };

    const handleRemoveFile = (fileName: string) => {
      const updatedFiles = files.filter((file) => file.fileName !== fileName);
      const fileToRemove = files.find((file) => file.fileName === fileName);
      fileToRemove && URL.revokeObjectURL(fileToRemove.url);
      logo === fileName && setLogo("");
      setFiles(updatedFiles);
      setSelectedFiles(updatedFiles);
    };

    return (
      <>
        <div className={style.dropBox} {...getRootProps()}>
          <input {...getInputProps()} />
          <p>Перетащите изображения сюда или<br/>нажмите для выбора файлов</p>
          {...dropAreaError}
        </div>

        <div className={cn(style.previewContainer, {
          [style.single]: files.length === 1,
          [style.double]: files.length === 2
        })}>
          {files.map((fileObj) => (
            <div key={fileObj.fileName}>
              <p className={style.fileName}>{fileObj.fileName}</p>

              <div className={style.previewImageContainer}>
                <img className={style.previewImage} src={fileObj.url} alt={`Preview ${fileObj.fileName}`}/>
                <label className={style.checkbox}>
                  <input
                    className='checkbox'
                    type='radio'
                    name='logo'
                    checked={fileObj.fileName === logo}
                    onChange={() => handleSelectLogo(fileObj.fileName)}
                  />
                  Logo
                </label>
                <button className={style.removeButton} type="button" onClick={() => handleRemoveFile(fileObj.fileName)}>
                  <CloseIcon/>
                </button>
                <input
                  className={cn(style.captionInput, {[style.error]: errors?.[fileObj.fieldName]})}
                  type="text"
                  placeholder="Введите описание"
                  defaultValue={fileObj.caption}
                  {...register(fileObj.fieldName, {
                    required: 'добавьте описание',
                    minLength: {
                      value: 3,
                      message: 'не менее 3 символов',
                    },
                    maxLength: {
                      value: 30,
                      message: 'не более 30 символов',
                    },
                  })}
                />
              </div>

              <span className={style.errorMessage}>
              {errors?.[fileObj.fieldName]?.message}&nbsp;
            </span>
            </div>
          ))}
        </div>

        <div className={style.buttonBlock}>
          <p className={style.logoError}>{formError}&nbsp;</p>
          <button className={style.buttonSubmit} type="button" onClick={handleSubmit(onSubmit)}>Готово</button>
        </div>
      </>
    );
  };
