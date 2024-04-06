import useApi from "./useApi";

export const useGetServerWarmup = () => {
  console.log('warm up')
  const api = useApi<any>({
    key: ["server", "warmup"],
    method: "GET",
    url: "server/warm-up",
  });
  return api.get;
};
