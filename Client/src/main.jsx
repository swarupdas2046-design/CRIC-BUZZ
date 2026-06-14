import { createRoot } from "react-dom/client";
import "./index.css";
import router from "./App.jsx";
import queryClient from "./lib/queryClient.js";
import { QueryClientProvider } from '@tanstack/react-query'
import { RouterProvider } from "react-router";
import store from './lib/store.js'
import { Provider } from 'react-redux'

createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </QueryClientProvider>,
);
