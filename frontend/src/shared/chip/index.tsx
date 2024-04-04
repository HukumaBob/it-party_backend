import React from "react";
import { TChip } from "../../app/types/types";
import style from "./index.module.scss";
import close from "../../app/assets/icons/close_mini_white.svg";

const COLORS: Record<string, string> = {
  blue: "#4989F9",
  purple: "#b15aee40",
  pink: "#F25D9E40",
  green: "#A8F55B40",
  orange: "#FF883440",
  yellow: "#FFEA3040",
};

export const Chip = ({ background, title, icon }: TChip) => {
  const buttonColor: string = COLORS[background] || background;

  const chipStyle = {
    backgroundColor: buttonColor,
    color: background !== "blue" ? "black" : "white",
  };

  return (
    <div className={style.chip} style={chipStyle}>
      {title} {icon ? <img src={close} alt='closeIcon' /> : ""}
    </div>
  );
};
