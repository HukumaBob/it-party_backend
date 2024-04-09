export type TChip = {
  background: string;
  title: string;
};

export type TCard = {
  info?: string;
  title: string;
  description: string;
  img: string;
  date: string;
  time: string;
  id: number;
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

export type TProps = {
  children: React.ReactNode;
  close: () => void;
};

export type TStateCard = {
  active: boolean;
};

export type TActionCard =
  | { type: "TOGGLE_ACTIVE"; payload: boolean }
  | { type: "SET_OPEN"; payload: boolean };

export type TPopupRegistration = {
  onClose: () => void;
};

export type TTextInput = {
  title: string;
  placeholder: string;
  type: string;
  isValid?: boolean;
};

export type TForm = {
  nameForm: string;
  children: React.ReactNode;
};

export type TSelectInput = {
  title: string;
};

export type TSpeaker = {
  img: string;
  imgReverse: string;
};

export type TFormValues = {
  name: string;
  secondName: string;
  email: string;
  phoneNumber: string;
  workplace: string;
  post: string;
  experience: string;
  direction: string;
  onlineParticipation: boolean;
  offlineParticipation: boolean;
};

export type TFormAuthorization = {
  email: string;
  password: string;
};

export type TFormErrors = {
  FieldErrors: TFormValues;
};

export type TInitialStateBannerSlide = {
  activeIndex: number;
};

export type TInitialStateForm = {
  clickExperience: boolean;
  selectedExperience: string;
  clickDirection: boolean;
  selectedDirection: string;
  onlineChecked: boolean;
  offlineChecked: boolean;
  agreementChecked: boolean;
  agreementPersonInfoChecked: boolean;
};

export type TAuthorizationInitialState = {
  openModal: boolean;
  showPassword: boolean;
};
