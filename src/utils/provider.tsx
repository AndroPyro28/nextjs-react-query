"use client";

import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import React from "react";

function Providers({ children }: React.PropsWithChildren) {
  const client = new QueryClient();

  return (
    <QueryClientProvider client={client}>
      <ReactQueryDevtools/>
        {children}
    </QueryClientProvider>
  );
}

export default Providers;