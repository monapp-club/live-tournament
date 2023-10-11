import { RouterProvider } from "react-router-dom";
import router from "./config/router";
import { queryClient } from "./query";
import { QueryClientProvider } from "@tanstack/react-query";
import { RootProvider } from "./providers/RootProvider";
import { AptabaseProvider } from "@aptabase/react";

const APTABASE_APP_KEY = process.env.REACT_APP_APTABASE_APP_KEY ?? "";

function App() {
  return (
    <AptabaseProvider appKey={APTABASE_APP_KEY}>
      <QueryClientProvider client={queryClient}>
        <RootProvider>
          <RouterProvider router={router} />
        </RootProvider>
      </QueryClientProvider>
    </AptabaseProvider>
  );
}

export default App;
