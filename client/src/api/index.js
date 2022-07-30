import { API_URLS, LOCALSTORAGE_TOKEN_KEY } from "../utils";

//custom fetch function for fetching data
const customFetch = async (url, { body, ...customConfig }) => {
  const token = window.localStorage.getItem(LOCALSTORAGE_TOKEN_KEY);

  const headers = {
    "content-type": "application/json",
  };
  //add bearer token in request header required to get leads
  if (token) {
    let auth_token = `Bearer ${token}`;
    headers.Authorization = auth_token;
  }

  const config = {
    ...customConfig,
    headers: {
      ...headers,
      ...customConfig.headers,
    },
  };

  if (body) {
    config.body = JSON.stringify(body);
  }

  try {
    const response = await fetch(url, config);
    const data = await response.json();

    if (data.data) {
      return {
        data: data,
        success: true,
      };
    }
    throw new Error(data.message);
  } catch (error) {
    console.error("error");
    return {
      message: error.message,
      success: false,
    };
  }
};

//login request
export const login = (body) => {
  return customFetch(API_URLS.login(), {
    method: "POST",
    body: body,
  });
};

//signup request
export const register = (body) => {
  return customFetch(API_URLS.signup(), {
    method: "POST",
    body: body,
  });
};
//get all leads request
export const getLeads = () => {
  return customFetch(API_URLS.getLeads(), {
    method: "GET",
  });
};
