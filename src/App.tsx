import { RouterProvider } from "react-router-dom";
import router from "./config/router";
import { queryClient } from "./query";
import { QueryClientProvider } from "@tanstack/react-query";
import { RootProvider } from "./providers/RootProvider";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RootProvider>
        <RouterProvider router={router} />
      </RootProvider>
    </QueryClientProvider>
  );
}

export default App;
