// export const BASE_URL = `${process.env.REACT_APP_BASE_URL}`;
const BASE_URL = "https://itparty.ddns.net";

// Эндпоинты API
export const LOGIN_API_ENDPOINT = "auth/jwt/create/"; // аутентификация пользователя
export const USERS_API_ENDPOINT = "auth/users/"; // регистрация пользователя
export const RESET_PASSWORD_API_ENDPOINT = "auth/users/reset_password/"; // сброс пароля пользователя
export const USER_PROFILES_API_ENDPOINT = "api/v1/userprofiles/"; // Эндпоинт для работы с профилями пользователей
export const USER_PROFILE_GET_AND_PATCH_API_ENDPOINT = "api/v1/userprofiles/me/"; // получение и изменение пользователя
export const LIST_COUNTRY_GET_API_ENDPOINT = "api/v1/countries/"; // получение списка стран
export const REMOVE_FROM_FAVORITE = "api/v1/remove_event_from_favorite/"; // удаление ивента из избранного
export const LIST_EVENT_VIEW_STAFF_API_ENDPOINT = "api/v1/list_event_viev_staff/"; // просмотр списка ивентов персоналом
export const FETCH_UPDATEURL = `${BASE_URL}${USER_PROFILE_GET_AND_PATCH_API_ENDPOINT}`; // для PATH запроса обновления данных профиля

export const REGISTER_AND_APPLY = "api/v1/register_and_apply/"; // GET, получение данных пользователя и id для регистрации и подачи заявки на участие в ивенте
export const SUBMIT_APPLICATION = "api/v1/submit_application/"; // POST, подача заявки на участие в ивенте
export const EVENTS_API_ENDPOINT = "api/v1/events"; // GET, получение списка ивентов
export const CITIES = 'api/v1/cities/' // GET, список городов
export const SPECIALIZATIONS = 'api/v1/specialization/'; // GET, список специализаций
export const EXPERIENCE = 'api/v1/experience/'; // GET, список опыт работы
export const STACK = 'api/v1/specialization_stacks/'; // GET, список специализаций с языками по каждой специализации
export const ADMIN_EVENT_LIST = 'api/v1/admin_events'; // GET, список ивентов администратора
export const USER_EVENT_STATUS = "api/v1/user_event_status"; // PATCH, статус участия пользователя в ивенте
export const REJECT_REASON = "api/v1/rejection_reason" // GET, список причин отказа

export const errorDownloadImage = "Анализ изображения не прошел";
