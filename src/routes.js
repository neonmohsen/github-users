import * as React from "react";
import { useRoutes } from "react-router-dom";
import { Dashboard, Error, Login, PrivateRoute } from "./pages";

export default function Router() {
  return useRoutes([
    {
      path: "/",
      element: (
        <PrivateRoute>
          <Dashboard />
        </PrivateRoute>
      ),
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "*",
      element: <Error />,
    },
  ]);
}
