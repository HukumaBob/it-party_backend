import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../app/services/hooks.ts";
import {getAdminEventData, resetAdminEventPage} from "../../app/services/slices/adminEditEventSlice.ts";
import {getCountryList} from "../../app/services/slices/countrySlice.ts";
import {getCityList} from "../../app/services/slices/citySlice.ts";
import {ModalEventCreateSuccess} from "../../widgets/ModalEventCreateSuccess";
import {ModalEventEditPhoto} from "../../widgets/ModalEventEditPhoto";
import {FormEditEvent} from "../../widgets/FormEditEvent";
import {ModalWrapper} from "../../shared/ModalWrapper";
import banner from "../../app/assets/image/other/admin_banner_event.webp";
import cn from "classnames";
import style from "./index.module.scss";

type TSelectedFiles = {
  files: { file: File; fileName: string; url: string; caption: string, isServerAsset: boolean, id?: number }[],
  logoIndex: number;
};

export const AdminEventPage = () => {
  const dispatch = useAppDispatch();
  const {eventId} = useParams();
  const navigate = useNavigate();
  const {status: countryListStatus} = useAppSelector((state) => state.country);
  const {status: cityListStatus} = useAppSelector((state) => state.city);
  const {statusGetEvent, errorGetEvent, statusCreateEvent, data} = useAppSelector((state) => state.adminEditEvent);

  useEffect(() => {
    eventId && statusGetEvent === 'idle' && dispatch(getAdminEventData(eventId));
    countryListStatus === 'idle' && dispatch(getCountryList());
    cityListStatus === 'idle' && dispatch(getCityList());
    return () => {
      dispatch(resetAdminEventPage())
    };
  }, []);

  const [isOpenModalEditPhoto, setIsOpenModalEditPhoto] = useState(false);
  const handleClose = () => setIsOpenModalEditPhoto(false);
  const handleOpen = () => setIsOpenModalEditPhoto(true);

  const [selectedFiles, setSelectedFiles] = useState<TSelectedFiles>({files: [], logoIndex: -1});
  useEffect(() => {
    if (statusGetEvent === 'success' && data.gallery) {
      console.log(data.gallery);
      const files = data.gallery.map((item) => ({
        file: new File([], item.event_photo),
        fileName: item.event_photo.split('/').pop() || '',
        url: item.event_photo,
        caption: item.caption,
        isServerAsset: true,
        id: item.id
      }));
      const logoIndex = data.gallery.findIndex((item) => item.event_photo === data.logo);
      setSelectedFiles({files, logoIndex});
    }
    if (statusGetEvent === 'error' &&
      typeof errorGetEvent === 'object' &&
      errorGetEvent !== null &&
      errorGetEvent?.statusCode === 404) {
      navigate('not-found', {replace: true});
    }
  }, [statusGetEvent, data]);

  const [galleryError, setGalleryError] = useState<boolean>(false);
  useEffect(() => {
    selectedFiles.files.length >= 2 && setGalleryError(false);
  }, [selectedFiles]);

  const [modalSuccessIsOpen, setModalSuccessIsOpen] = useState(false);
  useEffect(() => {
    statusCreateEvent === 'success' && setModalSuccessIsOpen(true);
  }, [statusCreateEvent]);

  return (
    <>
      <img className={style.banner} src={banner} alt="banner"/>
      <div className={cn('container', style.container)}>
        <FormEditEvent
          selectedFiles={selectedFiles}
          setGalleryError={setGalleryError}
          galleryError={galleryError}
        />

        <div className={style.gallery}>
          <p className={style.galleryTitle}>Галерея</p>
          <div className={style.galleryContainer}>
            {selectedFiles && selectedFiles.files.map(({url, caption}) => (
              <img className={style.previewImage} src={url} alt={caption} key={url}/>
            ))}
            <div>
              <button
                className={cn(style.galleryButton, {[style.error]: galleryError})}
                type="button"
                onClick={handleOpen}
              >
                {selectedFiles.files.length === 0 ? '+ Ещё фото' : 'Редактировать'}
              </button>
              <span className={style.galleryError}>
                {galleryError && 'необходимо добавить фото'}&nbsp;
              </span>
            </div>
          </div>

          <ModalWrapper isOpen={isOpenModalEditPhoto} handleClose={handleClose} width={1000}>
            <ModalEventEditPhoto
              selectedFiles={selectedFiles}
              setSelectedFiles={setSelectedFiles}
              handleClose={handleClose}
            />
          </ModalWrapper>
        </div>
      </div>

      <ModalEventCreateSuccess
        modalSuccessIsOpen={modalSuccessIsOpen}
        setModalSuccessIsOpen={setModalSuccessIsOpen}
      />
    </>
  );
};
