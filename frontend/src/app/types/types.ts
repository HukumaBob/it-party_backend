export type TChip = {
  background: string;
  title: string;
};

export type TCard = {
  info?: string;
  title: string;
  description?: string;
  img: string;
  date: string;
  time: string;
  id: number;
  admin?: boolean;
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

export type TSelectData = {
  id: string;
}

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
  agreement_required?: boolean;
};

export type TFormErrors = {
  FieldErrors: TFormValues;
};

export type TFormDataPersonalErrors = {
  FieldErrors: TFormDataPersonalValues;
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
  onlineCheckedFormAboutMe: boolean;
  offlineCheckedFormAboutMe: boolean;
  agreementChecked: boolean;
  agreementPersonInfoChecked: boolean;
  clickMaritalStatus: boolean;
  selectedMaritalStatus: number;
  clickProfileExperience: boolean,
  selectedProfileExperience: number,
  clickProfileSpecialization: boolean,
  selectedProfileSpecialization: number,
  clickIncome: boolean,
  selectedIncome: number,
  clickEducation: boolean,
  selectedEducation: number,
  clickTimeInterval: boolean,
  smsChecked: boolean,
  emailChecked: boolean,
  approvalApplicationChecked: boolean,
  newEventsChecked: boolean,
  selectedTimeInterval: number,
  selectedNavDataPersonal: boolean,
  selectedNavCareerAndEducation: boolean,
  selectedNavAboutMe: boolean,
  selectedNavConfidentiality: boolean,
  selectedNavNotification: boolean,
  selectedNavMain: boolean,
  openModalAvatar: boolean,
  changeDateOfBirth: string,
};

export type TAuthorizationInitialState = {
  openModal: boolean;
  showPassword: boolean;
  openRegistration: boolean;
  checked: boolean;
  error?: string | null;
  ok: boolean;
  authorizationUser:boolean
  data: {
    email: string;
    password: string;
  };
};

export type TUser = {
  name: string;
  email: string;
  phoneNumber: string;
  surName: string;
  workplace: string;
  post: string;
};

export type TNavigation = {
  id: string;
}

export type TUserProfileValues = {
  id: number;
  first_name: string;
  last_name: string;
  user_photo: string;
  phone: string;
  place_of_work: string;
  position: string;
  online: boolean;
  agreement_optional: boolean;
  date_of_birth: string;
  hobby: string;
  values: string;
  aims: string;
  cv: string;
  motivation: string;
  user: number;
  specialization: number;
  experience: number;
  familystatus: number;
  education: number;
  income: number;
  notification: number;
  country: string;
  city: number;
}

export type TFormDataPersonalValues = {
  first_name: string;
  last_name: string;
  date_of_birth?: string;
  familystatus?: number;
  country?: string;
}

export type TFormCareerAndEducationValues = {
  place_of_work: string;
  position: string;
  experience: number;
  specialization: number;
  income?: number;
  education?: number;
}

export type TFormAboutMeValues = {
  hobby?: string;
  values?: string;
  aims?: string;
  cv?: string;
  motivation?: string;
  online?: boolean;
  offline?: boolean;
}

export type TFormConfidentialityValues = {
  email: string;
  phone: string;
  new_password:	string;
  current_password:	string;
}

export type TFormProfileAvatar = {
  user_photo: string;
}

export type TFormConfidentiality = {
  email: string;
  phone: string;
  new_password:	string;
  current_password:	string;
}

export type TLoginResponse = {
  user: TFormAuthorization;
  access: string;
  refresh: string;
};

export type TEventsInitialState = {
  cards: TCard[];
  loading: boolean;
  error?: string | null;
};

export type TApplication = {
  name: string;
  company: string;
  post: string;
  experience: string;
  status: string;
  id: number;
};
export type TAdminPageInitialState = {
  activeTab: string;
  archive: TCard[];
  refusals: TApplication[];
  showInput: number | null;
  inputValues: Record<number, string>;
  status: Record<number, string>;
};
export type TErrorMessage = {
  email: string;
};
export type TResponseReg = {
    email: string;
    password: string;
    ok: boolean;
};

export function setItem<T>(key: string, value: T): void {
  localStorage.setItem(key, JSON.stringify(value));
}

export function getItem<T>(key: string): T | null {
  const item = localStorage.getItem(key);
  return item ? JSON.parse(item) as T : null;
}