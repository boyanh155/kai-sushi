import { useGetServerWarmup } from "@/hooks/api/useServer";
import { redirect } from "next/navigation";
import LoadingPage from "./loading";

export default function Home() {
  const api = useGetServerWarmup();
  if (api?.isLoading) return <LoadingPage />;
  redirect("/");
}
