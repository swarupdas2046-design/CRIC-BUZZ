import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router";

import AppLayout from "./layout/AppLayout";
import AdminLayout from "./layout/AdminLayout";

import Home from "./pages/public/Home";
import Login from "./pages/public/Login";
import Register from "./pages/public/Register";

import AdminHome from "./pages/private/AdminHome";
import Tournaments from "./pages/private/Tournaments";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";
import Teams from "./pages/private/Teams";
import Players from "./pages/private/Players";
import Matches from "./pages/private/Matches";
import LiveScoring from "./pages/private/LiveScoring";
import Users from "./pages/private/Users";


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
        element: <Tournaments />,
      },
      {
        path: "teams",
        element: <Teams />,
      },
      {
        path: "players",
        element: <Players />,
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
          {
            path: "tournaments",
            element: <Tournaments />,
          },
          {
            path: "teams",
            element: <Teams />,
          },
          {
            path: "players",
            element: <Players />,
          },
          {
            path: "matches",
            element: <Matches />,
          },
          {
            path: "live-scoring",
            element: <LiveScoring />,
          },
          {
            path: "users",
            element: <Users />,
          },
        ],
      },
    ],
  },
]);

export default router;
