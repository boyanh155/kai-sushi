import axios, { AxiosRequestConfig } from "axios";
import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { ApiErrorResponse } from "../../../types/ErrorType";

export let baseUrl = `${process.env.NEXT_PUBLIC_API_URL}/vi/api`;
export const getUserInfo = () => {
  const _user = localStorage.getItem("user");
  return typeof window !== "undefined" && _user
    ? JSON.parse(typeof window !== "undefined" && (_user as string | any))
    : null;
};

export const config = () => {
  const _user = getUserInfo();
  if (!_user) return;
  return {
    headers: {
      Authorization: `Bearer ${_user.token}`,
    },
  };
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
          .get(`${baseUrl}/${url}`, { ...config(), ...customConfig })
          .then((res) => res.data);

      case "POST":
        return await axios
          .post(`${baseUrl}/${url}`, obj, {
            ...config(),
            ...customConfig,
          })
          .then((res) => res.data);

      case "PUT":
        return await axios
          .put(`${baseUrl}/${url}`, obj, {
            ...config(),
            ...customConfig,
          })
          .then((res) => res.data);

      case "DELETE":
        return await axios
          .delete(`${baseUrl}/${url}`, { ...config(), ...customConfig })
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
}

export default function useApi<ResponseBody>({
  key,
  method,
  url,
  customConfig,
}: ApiHookParams) {
  const queryClient = new QueryClient();

  switch (method) {
    case "GET":
      // eslint-disable-next-line
      const get = useQuery<ResponseBody>({
        queryKey: key,
        queryFn: () => api(method, url, {}, customConfig),
        retry: 0,
      });
      return { get };

    case "POST":
      // eslint-disable-next-line
      const post = useMutation({
        mutationFn: (obj: any) => api(method, url, obj, customConfig),
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
          api(method, `${url}/${obj?.id}`, obj, customConfig),
        retry: 0,
        onSuccess: () => queryClient.invalidateQueries({ queryKey: key }),
      });

      return { put };

    case "DELETE":
      // eslint-disable-next-line
      const deleteObj = useMutation({
        mutationFn: (id: string) =>
          api(method, `${url}/${id}`, {}, customConfig),
        retry: 0,
        onSuccess: () => queryClient.invalidateQueries({ queryKey: key }),
      });
      return { deleteObj };

    default:
      throw new Error(`Invalid method ${method}`);
  }
}
