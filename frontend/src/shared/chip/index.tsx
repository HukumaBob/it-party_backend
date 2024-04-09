import React, { useState } from "react";
import { TChip } from "../../app/types/types";
import style from "./index.module.scss";
import close from "../../app/assets/icons/close_mini_white.svg";

const COLORS: Record<string, string> = {
  blue: "#4989F940",
  purple: "#b15aee40",
  pink: "#F25D9E40",
  green: "#A8F55B40",
  orange: "#FF883440",
};
const ACTIVE: Record<string, string> = {
  blue: "#4989F9",
  purple: "#B15AEE",
  pink: "#F25D9E",
  green: "#A8F55B",
  orange: "#FF8834",
};

export const Chip = ({ background, title }: TChip) => {
  const [clicked, setClicked] = useState<boolean>(false);

  const handleClick = () => {
    setClicked(!clicked);
  };

  const chipColor: string = COLORS[background] || background;
  const activeColor: string = ACTIVE[background] || background;

  const chipStyle = {
    backgroundColor: clicked ? activeColor : chipColor,
    color: clicked ? "white" : "black",
  };

  return (
    <div
      className={`${style.chip} ${style[background]}`}
      style={chipStyle}
      onClick={handleClick}>
      {title} {clicked ? <img src={close} alt='closeIcon' /> : ""}
    </div>
  );
};
