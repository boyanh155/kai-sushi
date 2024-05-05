"use client";

import useApi from "@/hooks/api/useApi";
import { useSearchParams } from "next/navigation";
import React from "react";

const SuccessPage = () => {
  const search = useSearchParams();

  const orderId = search.get("orderId") || "";
  const apiGet = useApi({
    key: ["takeaway", "payment", orderId],
    url: "takeaway/" + orderId,
    method: "GET",
  }).get;

  React.useEffect(() => {
    if (!apiGet?.data) return;
    console.log(apiGet?.data);
  }, [apiGet?.data]);

  return <div>SuccessPage</div>;
};

export default SuccessPage;
