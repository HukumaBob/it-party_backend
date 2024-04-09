import PortalReactDOM from "react-dom";
import style from "./index.module.scss";
import { useEffect } from "react";
import { TProps } from "../../app/types/types";

export const Modal = ({ children, close }: TProps) => {
  const pressKeyEsc = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      close();
    }
  };
  useEffect(() => {
    document.addEventListener("keydown", pressKeyEsc);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", pressKeyEsc);
      document.body.style.overflow = "auto";
    };
  }, []);
  const modalRoot = document.getElementById("modal");
  return PortalReactDOM.createPortal(
    <div className={style.wrapper}>
      <div className={style.container}>{children}</div>
    </div>,
    modalRoot!,
  );
};
