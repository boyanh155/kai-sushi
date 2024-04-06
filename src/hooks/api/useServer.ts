import useApi from "./useApi";

export const useGetServerWarmup = () => {
  const api = useApi<any>({
    key: ["server", "warmup"],
    method: "GET",
    url: "server/warm-up",
  });
  return api.get;
};
