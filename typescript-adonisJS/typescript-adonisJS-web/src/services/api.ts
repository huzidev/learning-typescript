import axios from 'axios';
import applyCaseMiddleware from 'axios-case-converter';

const api = applyCaseMiddleware(
  axios.create({
    baseURL: 'http://127.0.0.1:3333/api',
  }),
  {
    ignoreHeaders: true,
    caseMiddleware: {
      requestTransformer: (d) => d,
      requestInterceptor: (config) => config,
    },
  },
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (!error?.response) {
      // eslint-disable-next-line prefer-promise-reject-errors
      return Promise.reject({
        response: {
          data: {
            data: null,
            message: 'Cannot connect with the server',
          },
        },
      });
    }
    return Promise.reject(error);
  },
);

// setToken will be string when user loggedIn and setToken(null) when user is loggingOut
export function setToken(token: string | null | undefined): void {
  const parsed = token ? `Bearer ${token}` : token;
  api.defaults.headers.Authorization = parsed;
}

export default api;
