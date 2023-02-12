import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AppProvider } from "./context";
import "./index.css";
import axios from "axios";
import { QueryClient, QueryClientProvider } from "react-query";
const queryClient = new QueryClient();
axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AppProvider>
        <App />
      </AppProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
