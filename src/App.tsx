import "./App.css";
import { RouterProvider } from "react-router-dom";
import router from "./config/router";
import { queryClient } from "./query";
import { QueryClientProvider } from "@tanstack/react-query";

function App() {
  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </div>
  );
}

export default App;
