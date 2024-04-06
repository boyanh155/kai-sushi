"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import React, { useState } from "react";

type Props = {
  children: React.ReactNode;
};

const ApiProvider = ({ children }: Props) => {
  const [client] = useState(
    new QueryClient({
      defaultOptions: { queries: { staleTime: 30 * 1000 * 60 } },
    })
  );

  return (
    <QueryClientProvider client={client}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export default ApiProvider;
