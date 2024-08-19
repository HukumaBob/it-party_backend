import {useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "../../app/services/hooks.ts";
import {getCountryList} from "../../app/services/slices/countrySlice.ts";
import {getCityList} from "../../app/services/slices/citySlice.ts";
import {ModalEditEventPhoto} from "../../widgets/ModalEditEventPhoto";
import {FormCreateEvent} from "../../widgets/FormCreateEvent";
import {ModalWrapper} from "../../shared/ModalWrapper";
import banner from "../../app/assets/image/other/admin_banner_event.webp";
import cn from "classnames";
import style from "./index.module.scss"

type FileWithMetadata = {
  file: File;
  fileName: string;
  fieldName: string;
  url: string;
  caption: string;
};

export const AdminEventPage = () => {
  const dispatch = useAppDispatch()
  const {status: countryListStatus} = useAppSelector((state) => state.country);
  const {status: cityListStatus} = useAppSelector((state) => state.city);

  useEffect(() => {
    countryListStatus === 'idle' && dispatch(getCountryList());
    cityListStatus === 'idle' && dispatch(getCityList());
  }, []);

  const [isOpenModalEditPhoto, setIsOpenModalEditPhoto] = useState(false);
  const handleClose = () => setIsOpenModalEditPhoto(false);
  const handleOpen = () => setIsOpenModalEditPhoto(true);

  const [selectedFiles, setSelectedFiles] = useState<FileWithMetadata[]>([]);
  const [logo, setLogo] = useState<string>('');
  const [filesError, setFilesError] = useState<boolean>(false);

  return (
    <>
      <img className={style.banner} src={banner} alt="banner"/>
      <div className={cn('container', style.container)}>
        <FormCreateEvent selectedFiles={selectedFiles} logo={logo} setFilesError={setFilesError}/>

        <div className={style.gallery}>
          <p className={style.galleryTitle}>Галерея</p>
          <div className={style.galleryContainer}>
            {selectedFiles && selectedFiles.map(({url, caption}) => (
              <img className={style.previewImage} src={url} alt={caption}/>
            ))}
            <div>
              <button
                className={cn(style.galleryButton, {[style.error]: filesError})}
                type="button"
                onClick={handleOpen}
              >
                + Ещё фото
              </button>
              <span className={style.galleryError}>
                {filesError && 'необходимо добавить фото'}&nbsp;
              </span>
            </div>
          </div>

          <ModalWrapper isOpen={isOpenModalEditPhoto} handleClose={handleClose} width={1000}>
            <ModalEditEventPhoto
              selectedFiles={selectedFiles}
              setSelectedFiles={setSelectedFiles}
              logo={logo}
              setLogo={setLogo}
              handleClose={handleClose}
              setFilesError={setFilesError}
            />
          </ModalWrapper>
        </div>
      </div>
    </>
  );
};
