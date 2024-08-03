type Endpoints = {
  LOGIN: string;
  USERS: string;
  RESET_PASSWORD: string;
  USER_PROFILE: string;
  USERS_PROFILES: string;
  REGISTER_AND_APPLY: string;
  SUBMIT_APPLICATION: string;
  USER_EVENT_STATUS: string;

  EVENT_LIST: string;
  COUNTRY_LIST: string;
  CITY_LIST: string;
  SPECIALIZATION_LIST: string;
  EXPERIENCE_LIST: string;
  STACK_LIST: string;
  ADMIN_EVENT_LIST: string;

  // REMOVE_FROM_FAVORITE: string;
  // LIST_EVENT_VIEW_STAFF_API_ENDPOINT: string;
  // REJECT_REASON: string;
}

// const base = import.meta.env.VITE_BASE_URL
// const BASE_URL = base ? base + '/' : "http://localhost:8000/"
const BASE_URL = "http://localhost:8000/"

const endpoints: Endpoints = {
  LOGIN: "auth/jwt/create/",                        // авторизация(получение jwt токена)
  USERS: "auth/users/",                             // регистрация пользователя
  RESET_PASSWORD: "auth/users/reset_password/",     // сброс пароля пользователя
  USER_PROFILE: "api/v1/userprofiles/me/",          // обновление данных профиля
  USERS_PROFILES: "api/v1/userprofiles/",           // Эндпоинт для работы с профилями пользователей
  REGISTER_AND_APPLY: "api/v1/register_and_apply",  // GET, получение данных для регистрации на ивент
  SUBMIT_APPLICATION: "api/v1/submit_application",  // POST, подача заявки на участие в ивенте
  USER_EVENT_STATUS: "api/v1/user_event_status/",   // PATCH, статус участия пользователя в ивенте

  EVENT_LIST: "api/v1/events",                      // GET, получение списка ивентов
  COUNTRY_LIST: "api/v1/countries/",                // GET, список стран
  CITY_LIST: 'api/v1/cities/',                      // GET, список городов
  SPECIALIZATION_LIST: 'api/v1/specialization/',    // GET, список специализаций
  EXPERIENCE_LIST: 'api/v1/experience/',            // GET, список, опыт работы
  STACK_LIST: 'api/v1/specialization_stacks/',      // GET, список специализаций с языками по каждой специализации
  ADMIN_EVENT_LIST: 'api/v1/admin_events/',         // GET, список ивентов администратора

  // REMOVE_FROM_FAVORITE: "api/v1/remove_event_from_favorite/", // удаление ивента из избранного
  // LIST_EVENT_VIEW_STAFF: "api/v1/list_event_viev_staff/",     // просмотр списка ивентов персоналом
  // REJECT_REASON : "api/v1/rejection_reason"                   // GET, список причин отказа
}

export const API = new Proxy(endpoints, {
  get(target: Endpoints, prop: keyof Endpoints) {
    if (prop in target) {
      return BASE_URL + target[prop];
    }
    return undefined;
  }
})
