import List from "@/components/TakeAway/List";
import SearchBox from "@/components/TakeAway/SearchBox";
import React from "react";

type Props = {};

const TakeAwayPage = (props: Props) => {
  return (
    <div className="flex flex-col w-full">
      <SearchBox />
      <List />
    </div>
  );
};

export default TakeAwayPage;
