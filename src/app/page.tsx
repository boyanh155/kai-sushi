import { useGetServerWarmup } from "@/hooks/api/useServer";
import { redirect } from "next/navigation";
import Loading from "@/components/shared/Loading";

export default function Home() {
  const api = useGetServerWarmup();
  if (api?.isLoading) return <Loading />;
  redirect("/");
}
