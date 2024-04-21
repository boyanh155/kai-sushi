import useApi from "./useApi";

export const useGetTakeAwayMenu = () => {
  const api = useApi({
    method: "GET",
    url: "takeaway",
    key: ["takeaway"],
  });
  return api.get;
};
