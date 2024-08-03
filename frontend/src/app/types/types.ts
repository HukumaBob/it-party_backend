export type TFormAuthorization = {
  email: string;
  password: string;
  agreement_required?: boolean;
};

export type TAuthorizationInitialState = {
  openModal: boolean;
  openRegistration: boolean;
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
  notification?: number;
  [index: string]: any;
};

export type TFormEditAvatar = {
  user_photo: FileList;
}

export type TFormConfidentialityValues = {
  phone?: string;
  [index: string]: any;
};

// export type TFormResetPassword = {
//   email: string;
// }

export type TLoginResponse = {
  user?: TFormAuthorization;
  access: string;
  refresh: string;
  error?: string | null;
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
  selectedMaritalStatus: number;
  selectedCountry: number;
  selectedProfileExperience: number;
  selectedProfileSpecialization: number;
  selectedIncome: number;
  selectedEducation: number;
  selectedTimeInterval: number;
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
  openModalResetPassword: boolean;
  resetOk: boolean;
};
