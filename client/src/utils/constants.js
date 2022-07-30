const ROOT = "http://localhost:8000/api/v1";
//API URLS
export const API_URLS = {
  getLeads: () => {
    return `${ROOT}/leads/`;
  },

  login: () => {
    return `${ROOT}/user/login`;
  },

  signup: () => {
    return `${ROOT}/user/register`;
  },
};

export const LOCALSTORAGE_TOKEN_KEY = "token";
