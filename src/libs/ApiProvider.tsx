"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import React, { useState } from "react";

type Props = {
  children: React.ReactNode;
};

const ApiProvider = ({ children }: Props) => {
  const [client] = useState(
    new QueryClient({
      defaultOptions: {
        queries: { staleTime:5000, gcTime:5000 },
      },
    })
  );

  return (
    <QueryClientProvider client={client}>
      {children}

    </QueryClientProvider>
  );
};

export default ApiProvider;
