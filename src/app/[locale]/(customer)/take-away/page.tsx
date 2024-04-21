"use client";
import Loading from "@/components/shared/Loading";
import List from "@/components/TakeAway/List";
import Popup from "@/components/TakeAway/Popup";
import SearchBox from "@/components/TakeAway/SearchBox";
import { useGetTakeAwayMenu } from "@/hooks/api/useTakeAwayMenu";
import useTakeAwayStore, { setTakeAwayData } from "@/stores/useTakeAwayStore";
import React, { useEffect } from "react";

type Props = {};

const TakeAwayPage = (props: Props) => {
  const api = useGetTakeAwayMenu();
  const setTakeAway = useTakeAwayStore(setTakeAwayData);

  useEffect(() => {
    if (!api || !api.data) return;

    setTakeAway(api.data as any);
  }, [api?.isPending]);
  return (
    <div className="flex flex-col w-full flex-grow">
      <SearchBox />
      {api?.isLoading ? <Loading /> : <List />}

      <Popup />
    </div>
  );
};

export default TakeAwayPage;
