import React from "react";
import style from "./index.module.scss";
import { BannerSlider } from "../../widgets/BannerSlider";
import { EventsCatalog } from "../../widgets/EventsCatalog";
import { QuestionsBlock } from "../../widgets/QuestionsBlock";
import { CardBlock } from "../../widgets/CardBlock";
import { Reviews } from "../../widgets/Reviews";
import { useDispatch, useSelector } from "../../app/types/hooks";
import { Modal } from "../../shared/modal";
import { setOpenModal } from "../../app/services/slices/authorization";
import { AuthorizationModal } from "../../widgets/Authorization";

export const MainPage = () => {
  const { openModal } = useSelector((state) => state.authorization);
  const dispatch = useDispatch();
  const handleCloseModal = () => {
    dispatch(setOpenModal(false));
  };
  return (
    <div className={style.wrapper}>
      <div className={style.container}>
        <BannerSlider />
        <EventsCatalog />
        <QuestionsBlock />
        <CardBlock title={"Популярные"} />
        <CardBlock title={"Рекомендуемые"} />
        <Reviews />
        {openModal && (
          <Modal close={handleCloseModal}>
            <AuthorizationModal />
          </Modal>
        )}
      </div>
    </div>
  );
};
