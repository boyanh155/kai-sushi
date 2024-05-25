import axios, { AxiosRequestConfig } from "axios";
import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { ApiErrorResponse } from "../../../types/ErrorType";
import Error from "next/error";
import { useLocale } from "next-intl";
import { headerLocaleKey } from "../../../constant/apiHelper";

export let baseUrl = `${process.env.NEXT_PUBLIC_API_URL}/locale/api`;
export const getUserInfo = () => {
  if (typeof window === "undefined") return null;
  const _user = localStorage.getItem("user");
  return _user
    ? JSON.parse(typeof window !== "undefined" && (_user as string | any))
    : null;
};

//interceptor
export async function api(
  method: string,
  url: string,
  obj = {},
  customConfig = {}
) {
  try {
    switch (method) {
      case "GET":
        return await axios
          .get(`${baseUrl}/${url}`, { ...customConfig })
          .then((res) => res.data);

      case "POST":
        return await axios
          .post(`${baseUrl}/${url}`, obj, {
            ...customConfig,
          })
          .then((res) => res.data);

      case "PUT":
        return await axios
          .put(`${baseUrl}/${url}`, obj, {
            ...customConfig,
          })
          .then((res) => res.data);

      case "DELETE":
        return await axios
          .delete(`${baseUrl}/${url}`, { ...customConfig })
          .then((res) => res.data);
    }
  } catch (error: any) {
    const errRes = error?.response;

    const err = errRes?.data?.message || "Something went wrong";
    const expectedErrors = ["invalid signature", "jwt expired"];
    if (expectedErrors.includes(err)) {
      localStorage.removeItem("user");
      window.location.reload();
    }
    throw {
      status: errRes?.status,
      message: err,
      error: errRes?.data || error,
    } as ApiErrorResponse;
  }
}

type Method = "GET" | "POST" | "PUT" | "DELETE";

interface ApiHookParams {
  key: string[];
  method: Method;
  url: string;
  customConfig?: AxiosRequestConfig;
  staleTime?: number;
}

export default function useApi<ResponseBody>({
  key,
  method,
  url,
  customConfig,
  staleTime,
}: ApiHookParams) {
  const queryClient = new QueryClient();

  interface ErrorResponse extends Error {
    status: number;
    message: string;
    error: any;
  }
  const _config = customConfig || {};
  if (!_config.headers) _config.headers = {};
  try {
    const locale = useLocale();
    _config.headers![headerLocaleKey] = locale || "en";
  } catch (e) {
 
    // console.log(e);
  }
  if (!_config.headers["Content-Type"])
    _config.headers!["Content-Type"] = "application/json";
  const _user = getUserInfo();

  if (_user) _config.headers.Authorization = `Bearer ${_user.token}`;
  switch (method) {
    case "GET":
      // eslint-disable-next-line
      const get = useQuery<ResponseBody, ErrorResponse>({
        queryKey: key,
        queryFn: (obj?: any) => api(method, url, obj, _config),
        retry: 0,
        ...(staleTime
          ? {
              staleTime,
            }
          : {}),
      });
      return { get };

    case "POST":
      // eslint-disable-next-line
      const post = useMutation({
        mutationFn: (obj: any) => api(method, url, obj, _config),
        retry: 0,
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: key });
        },
        
      });
      return { post };

    case "PUT":
      // eslint-disable-next-line
      const put = useMutation({
        mutationFn: (obj: any) =>
          api(method, `${url}/${obj?.id}`, obj, _config),
        retry: 0,
        onSuccess: () => queryClient.invalidateQueries({ queryKey: key }),
      });

      return { put };

    case "DELETE":
      // eslint-disable-next-line
      const deleteObj = useMutation({
        mutationFn: (id: string) => api(method, `${url}/${id}`, {}, _config),
        retry: 0,
        onSuccess: () => queryClient.invalidateQueries({ queryKey: key }),
      });
      return { deleteObj };

    default:
      throw new Error(`Invalid method ${method}` as any);
  }
}
