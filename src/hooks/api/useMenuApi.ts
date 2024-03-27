import {
  MenuDataRequestBody,
  MenuDataResponseBody,
} from "../../../types/ApiMenuType";
import useApi from "./useApi";
import _ from "lodash";

export const useGetMenu = (type: "food" | "beverage" | "both" = "both") => {
  console.log( type);
  const { get } = useApi<MenuDataResponseBody[]>({
    key: ["menu", type],
    method: "GET",
    url: type,
  });
  return get;
};

export const usePostMenu = (input?: {
  bodyData?: MenuDataRequestBody;
  type?: "food" | "beverage";
}) => {
  const { post } = useApi<MenuDataResponseBody>({
    key: ["menu"],
    method: "POST",
    url: `menu/${input?.type || "food"}`,
  });
  if (_.isEmpty(input?.bodyData)) return;
  post?.mutateAsync(input?.bodyData);
  return post;
};

export const usePutMenu = (bodyData: MenuDataRequestBody) => {
  const { put } = useApi<MenuDataResponseBody>({
    key: ["menu"],
    method: "PUT",
    url: "menu",
  });
  put?.mutateAsync(bodyData);
  return put;
};
