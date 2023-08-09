"use client";

import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import React from "react";

function Providers({ children }: React.PropsWithChildren) {
  const client = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 1000 * 60 * 5
      }
    }
  });
  console.log('main layout')

  return (
    <QueryClientProvider client={client}>
      <ReactQueryDevtools/>
        {children}
    </QueryClientProvider>
  );
}

export default Providers;