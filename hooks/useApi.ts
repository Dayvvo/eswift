import type { AxiosRequestConfig, AxiosResponse, CancelToken } from "axios";
import axios from "axios";
import { useSelector } from "./useDispatch";
import { API_URL } from "@/config/config";


export type ApiClient = {
  query: <T extends any>(
    q: string,
    headers?: AxiosRequestConfig
  ) => Promise<AxiosResponse<T, any>>;
  delete: (q: string, headers?: AxiosRequestConfig) => Promise<any>;
  post: <T extends any, D extends any>(
    q: string,
    data: D,
    headers?: AxiosRequestConfig
  ) => Promise<AxiosResponse<T, any>>;
  putMutation: <T extends any, D extends any>(
    q: string,
    data: any,
    headers?: AxiosRequestConfig
  ) => Promise<AxiosResponse<T, any>>;
  patchMutation: <T extends any, D extends any>(
    q: string,
    data: any,
    headers?: AxiosRequestConfig
  ) => Promise<AxiosResponse<T, any>>;
};

const client = ({
  token = "",
  baseURL = "",
  withCredentials = true,
  cancelToken,
}: {
  token?: string;
  baseURL?: string;
  withCredentials?: boolean;
  cancelToken?: CancelToken;
}) => {
  return axios.create({
    ...(baseURL && { baseURL }),
    headers: {
      ...(token && { Authorization: token }),
      "Content-Type": "application/json",
    },
    withCredentials,
    cancelToken,
  });
};

function httpClient({
  baseURL = API_URL,
  token,
}: {
  baseURL?: string;
  token?: string;
}) {
  return {
    query: async <T extends any>(q: string, headers?: AxiosRequestConfig) => {
      try {
        const resp = client({ token, baseURL }).get(q, headers);
        const result: AxiosResponse<T, any> = await Promise.resolve(resp);
        return result;
      } catch (err) {
        return Promise.reject(err);
      }
    },
    delete: async (q: string, headers?: AxiosRequestConfig) => {
      try {
        return await Promise.resolve(
          client({ token, baseURL }).delete(q, headers)
        );
      } catch (err) {
        return Promise.reject(err);
      }
    },
    post: async <T extends any, D extends any>(
      q: string,
      data: D,
      headers?: AxiosRequestConfig
    ) => {
      try {
        const resp = client({ token, baseURL }).post(q, data, headers);
        const result: AxiosResponse<T, any> = await Promise.resolve(resp);
        return result.data;
      } catch (err) {
        return Promise.reject(err);
      }
    },
    putMutation: async <T extends any, D extends any>(
      q: string,
      data: D,
      headers?: AxiosRequestConfig
    ) => {
      try {
        const resp = client({ token, baseURL }).put(q, data, headers);
        const result: AxiosResponse<T, any> = await Promise.resolve(resp);
        return result.data;
      } catch (err) {
        return Promise.reject(err);
      }
    },
    patchMutation: async <T extends any, D extends any>(
      q: string,
      data: D,
      headers?: AxiosRequestConfig
    ) => {
      try {
        const resp = client({ token, baseURL }).patch(q, data, headers);
        const result: AxiosResponse<T, any> = await Promise.resolve(resp);
        return result.data;
      } catch (err) {
        return Promise.reject(err);
      }
    },
  };
}

export function useApiUrl(token?: string, baseUrl?: string) {
  const { token: StateToken }: any = useSelector<any>(
    (state) => state.auth.auth
  );

  const authToken = token || `Bearer ${StateToken}`;

  return httpClient({ baseURL: baseUrl ?? API_URL, token: authToken });
}

export default httpClient;
