import axios from 'axios';
import applyCaseMiddleware from 'axios-case-converter';

// THESE ARE ALL ALREADY CREATED TEXT

const api = applyCaseMiddleware(
  axios.create({
    baseURL: 'http://127.0.0.1:3333/api', // /api is prefix defined in backend
    // baseURL: 'http://192.168.0.101:3333/api',
    // baseURL: `${window.location.origin}/api`,
    // baseURL: 'http://18.192.13.191:3333',
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
            // when TRY CATCH catches the error the message for error will be this message and we'll use mapErrorToState(error) for defining message regarding the error
            message: 'Cannot connect with the server',
          },
        },
      });
    }
    return Promise.reject(error);
  },
);
// api.interceptors.response.use((response) => {
//   return response.data;
// });

export function setToken(token: string | null | undefined): void {
  const parsed = token ? `Bearer ${token}` : token;
  api.defaults.headers.Authorization = parsed;
}

export default api;
