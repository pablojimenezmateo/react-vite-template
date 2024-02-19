import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import router from "./routes.tsx";
import { ChakraProvider } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import theme from "./theme.ts";
import TokenHandlerContextProvider from "./providers/TokenHandlerContextProvider.tsx";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <TokenHandlerContextProvider>
          <RouterProvider router={router}></RouterProvider>
        </TokenHandlerContextProvider>
      </QueryClientProvider>
    </ChakraProvider>
  </React.StrictMode>
);
