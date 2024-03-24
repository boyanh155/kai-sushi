import axios, { AxiosError, AxiosRequestConfig } from "axios";
import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { getLocale } from "next-intl/server";
import { AppConfig } from "@/libs/AppConfig";

export let baseUrl = async () => {
  // const locale = (await getLocale()) || AppConfig.defaultLocale;
  if (process.env.NODE_ENV === "production") {
    return `${process.env.NEXT_PUBLIC_API_URL}/vi/api`;
  }
  // change locale
  return `http://localhost:3000/vi/api`;
};

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
          .get(`${await baseUrl()}/${url}`, { ...config(), ...customConfig })
          .then((res) => res.data);

      case "POST":
        return await axios
          .post(`${await baseUrl()}/${url}`, obj, {
            ...config(),
            ...customConfig,
          })
          .then((res) => res.data);

      case "PUT":
        return await axios
          .put(`${await baseUrl()}/${url}`, obj, {
            ...config(),
            ...customConfig,
          })
          .then((res) => res.data);

      case "DELETE":
        return await axios
          .delete(`${await baseUrl()}/${url}`, { ...config(), ...customConfig })
          .then((res) => res.data);
    }
  } catch (error: any) {
    const errRes = error?.response;

    const err = errRes?.data?.error || "Something went wrong";
    const expectedErrors = ["invalid signature", "jwt expired"];
    if (expectedErrors.includes(err)) {
      localStorage.removeItem("user");
      window.location.reload();
    }
    throw {
      status: errRes?.status,
      message: err,
      error,
    };
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
