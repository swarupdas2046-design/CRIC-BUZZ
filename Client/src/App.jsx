import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router";

import AppLayout from "./layout/AppLayout";
import AdminLayout from "./layout/AdminLayout";

import Home from "./pages/public/Home";
import Login from "./pages/public/Login";
import Register from "./pages/public/Register";

import AdminHome from "./pages/private/AdminHome";

import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";

let router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },

      {
        element: <PublicRoute />,
        children: [
          {
            path: "login",
            element: <Login />,
          },
          {
            path: "register",
            element: <Register />,
          },
        ],
      },

      {
        path: "tournaments",
        element: <div>Tournaments</div>,
      },
      {
        path: "teams",
        element: <div>Teams</div>,
      },
      {
        path: "players",
        element: <div>Players</div>,
      },
    ],
  },

  {
    path: "/admin",
    element: <ProtectedRoute />,
    children: [
      {
        element: <AdminLayout />,
        children: [
          {
            index: true,
            element: <AdminHome />,
          },
        ],
      },
    ],
  },
]);

export default router;
