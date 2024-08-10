type TEndpoints = {
  LOGIN: string;
  USERS: string;
  RESET_PASSWORD: string;
  USER_PROFILE: string;
  USERS_PROFILES: string;
  REGISTER_AND_APPLY: string;
  SUBMIT_APPLICATION: string;
  USER_EVENT_STATUS: string;

  EVENT_LIST: string;
  ADMIN_EVENT_LIST: string;
  COUNTRY_LIST: string;
  FAMILY_STATUS_LIST: string;
  EDUCATION_LIST: string;
  INCOME_LIST: string;
  CITY_LIST: string;
  SPECIALIZATION_LIST: string;
  EXPERIENCE_LIST: string;
  STACK_LIST: string;
  NOTIFICATION_LIST: string;

  // REMOVE_FROM_FAVORITE: string;
  // LIST_EVENT_VIEW_STAFF_API_ENDPOINT: string;
  // REJECT_REASON: string;
}

const BASE_URL = ""
// const BASE_URL = import.meta.env.VITE_BASE_URL || "http://localhost:8000"


const endpoints: TEndpoints = {
  LOGIN: "auth/jwt/create/",                        // авторизация(получение jwt токена)
  USERS: "auth/users/",                             // регистрация пользователя
  RESET_PASSWORD: "auth/users/reset_password/",     // сброс пароля пользователя
  USER_PROFILE: "api/v1/userprofiles/me/",          // обновление данных профиля
  USERS_PROFILES: "api/v1/userprofiles/",           // GET, POST, PATCH, получение/создание/обновление профиля пользователя
  REGISTER_AND_APPLY: "api/v1/register_and_apply",  // GET, получение данных для регистрации на ивент
  SUBMIT_APPLICATION: "api/v1/submit_application",  // POST, подача заявки на участие в ивенте
  USER_EVENT_STATUS: "api/v1/user_event_status/",   // PATCH, статус участия пользователя в ивенте

  EVENT_LIST: "api/v1/events",                      // GET, список, ивенты
  ADMIN_EVENT_LIST: 'api/v1/admin_events',          // GET, список, ивенты администратора
  COUNTRY_LIST: "api/v1/countries/",                // GET, список, страны
  FAMILY_STATUS_LIST: "api/v1/family-statuses/",    // GET, список, семейное положение
  EDUCATION_LIST: "api/v1/educations/",             // GET, список, образование
  INCOME_LIST: "api/v1/incomes/",                   // GET, список, доходы
  CITY_LIST: 'api/v1/cities/',                      // GET, список, города
  SPECIALIZATION_LIST: 'api/v1/specialization/',    // GET, список, специализации
  EXPERIENCE_LIST: 'api/v1/experience/',            // GET, список, опыт работы
  STACK_LIST: 'api/v1/specialization_stacks/',      // GET, список, специализаций с IT языками по каждой специализации
  NOTIFICATION_LIST: 'api/v1/notifications/',       // GET, список, уведомления

  // REMOVE_FROM_FAVORITE: "api/v1/remove_event_from_favorite/", // удаление ивента из избранного
  // LIST_EVENT_VIEW_STAFF: "api/v1/list_event_viev_staff/",     // просмотр списка ивентов персоналом
  // REJECT_REASON : "api/v1/rejection_reason"                   // GET, список причин отказа
}

export const API = new Proxy(endpoints, {
  get(endpoints: TEndpoints, key: keyof TEndpoints) {
    if (key in endpoints) {
      return BASE_URL + '/' + endpoints[key];
    }
    throw new Error(`api.ts: unknown endpoint ${String(key)}`);
  }
});
