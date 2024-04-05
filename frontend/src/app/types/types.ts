export type TChip = {
  background: string;
  title: string;
  icon: boolean;
};

export type TCard = {
  info?: string;
  title: string;
  description: string;
  img: string;
  date: string;
  time: string;
};

export type TQuestion = {
  text: string;
  response: string;
};

export type TPopularOrRecomendedEvents = {
  title: string;
};

export type TReview = {
  img: string;
  company: string;
  description: string;
  text: string;
  activeIndex: number;
  isActive: boolean;
};

export type TSlideSwitcher = {
  activeIndex: number;
  handleClick?: (index: number) => void;
  length: number;
};
export type TActiveIndex = {
  activeIndex: number;
};

export type TBanner = {
  date: string;
  city: string;
  title: string;
  img: {
    banner_orange: string;
    banner_purple: string;
    banner_green: string;
    banner_blue: string;
  };
};
