import React from 'react'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router";

import AppLayout from './layout/AppLayout';
import AdminLayout from './layout/AdminLayout';
let router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
  },
   {
    path: "/admin",
    element: <AdminLayout />,
  },
]);

export default router;
