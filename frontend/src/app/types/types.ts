export type TChip = {
  id: number
  specialization: string;
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
  myEventBoolean?: boolean;
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
  id: number;
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
  first_name: string;
  second_name: string;
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
  agreementChecked: boolean;
  agreementPersonInfoChecked: boolean;
  alertForm: boolean;
};

export type TAuthorizationInitialState = {
  openModal: boolean;
  showPassword: boolean;
  openRegistration: boolean;
  checked: boolean;
  error?: string | null;
  ok: boolean;
  authorizationUser: boolean;
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

export type TLogout = {
  onLogout: () => void;
};

export type TImageAvatar = {
  src: string;
  onload: () => void;
  onerror?: () => void;
};

export type TNavigation = {
  id: string;
  onLogout: () => void;
};

export type TUserProfileValues = {
  id: number;
  first_name: string;
  last_name: string;
  user_photo: string;
  phone: string;
  place_of_work: string;
  position: string;
  online: boolean;
  offline: boolean;
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
  country: number;
  city: number;
  [index: string]: any;
};

export type TListCountry = {
  results: TCountries;
};

export type TCountries = {
  id: number;
  name?: string;
  country_id: number;
};

export type TFormDataPersonalValues = {
  first_name?: string;
  last_name?: string;
  date_of_birth?: string;
  familystatus?: number;
  country?: number;
  place_of_work?: string;
  position?: string;
  experience?: number;
  specialization?: number;
  income?: number;
  education?: number;
  hobby?: string;
  values?: string;
  aims?: string;
  cv?: string;
  motivation?: string;
  online?: boolean;
  offline?: boolean;
  user_photo?: string;
  [index: string]: any;
};

export type TFormEditAvatar = {
  user_photo: FileList;
}

export type TFormConfidentialityValues = {
  phone?: string;
  password?: string;
  password_confirm?: string;
  [index: string]: any;
};

export type TFormConfidentiality = {
  email: string;
  phone: string;
};

export type TLoginResponse = {
  user?: TFormAuthorization;
  access: string;
  refresh: string;
  error?: string | null;
};

export type Tspecialization = {
  id: number,
  specialization: string,
  countryid: string
}

export type Tcity = {
  id: number,
  name: string,
  countryid: string
}

export type TEventCard = {
  info?: string;
  name: string;
  description?: string;
  logo: string;
  date: string;
  time: string;
  id: number;
  admin?: boolean;
  myEventBoolean?: boolean;
};

type TFilters = {
  city?: number,
  online?: boolean,
  name?: string,
  date_after?: string | undefined,
}

export type TEventsInitialState = {
  cards: TEventCard[];
  cities: Tcity[];
  specializations: Tspecialization[];
  loading: boolean;
  error?: string | null;
  filters: TFilters
  specializationsFilters: Record<string, number | boolean>;
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
};

export function getItem<T>(key: string): T | null {
  const item = localStorage.getItem(key);
  return item ? (JSON.parse(item) as T) : null;
};

export type TProfileInitialState = {
  name: string;
  secondName: string;
  errorProfile?: string | null;
  receiveProfileUser: boolean;
  avatar: string;
  place_of_work: string;
  position: string;
  hobby: string;
  values: string;
  aims: string;
  cv: string;
  phone: string;
  email: string;
  motivation: string;
  notification: number;
  selectedMaritalStatus: number;
  selectedCountry: number;
  selectedProfileExperience: number;
  selectedProfileSpecialization: number;
  selectedIncome: number;
  selectedEducation: number;
  selectedTimeInterval: number;
  selectedNavDataPersonal: boolean;
  selectedNavCareerAndEducation: boolean;
  selectedNavAboutMe: boolean;
  selectedNavConfidentiality: boolean;
  selectedNavNotification: boolean;
  selectedNavMain: boolean;
  openModalAvatar: boolean;
  changeDateOfBirth: string;
  clickMaritalStatus: boolean;
  clickCountry: boolean;
  clickProfileExperience: boolean; 
  clickProfileSpecialization: boolean;
  clickIncome: boolean; 
  clickEducation: boolean;
  onlineCheckedFormAboutMe: boolean;
  offlineCheckedFormAboutMe: boolean;
  clickTimeInterval: boolean;
  smsChecked: boolean;
  emailChecked: boolean;
  approvalApplicationChecked: boolean;
  newEventsChecked: boolean;
  profileBlock: boolean;
  showPassword: boolean;
  showPasswordConfirm: boolean;
};

export type TMyEventsInitialState = {
  activeTab: string;
  favouriteEvents: TCard[];
  active: Record<number, boolean>;
  myEvent: oneEvent[] | [];
  loading: boolean;
  error: string | null;
  eventInfo: profileDataInfo | null;
};

export type oneEvent = {
  id: number;
  logo: string;
  name: string;
  description: string;
  date: string;
  time: string;
  user_application_status: string;
  specialization?: {
    id: number;
    specialization: string;
    index: number;
  };
};

export type TGetMyEvent = {
  count: number;
  next: string;
  previous: string | null;
  results: oneEvent[];
};

export type PostEventPayload = {
  id: number;
};

export type PatchEventPayload = {
  id: number;
};

export type TsubmitEventForm = {
  id: number;
  data: profileDataInfo;
};

export type profileDataInfo = {
  id?: number;
  first_name: string;
  last_name: string;
  date_of_birth: string;
  place_of_work: string;
  position: string;
  specialization: number;
  experience: number;
  phone: string;
  online: boolean;
  user_event_id: number;
};
