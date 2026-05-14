import { createBrowserRouter } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/login/login";
import NonAuth from "./Layouts/NonAuth";
import { Dashboard } from "./Layouts/Dashboard";
import { Root } from "./Layouts/Root";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <Dashboard />,
        children: [
          {
            path: "",
            element: <HomePage />,
          },
        ],
      },
      {
        path: "/auth",
        element: <NonAuth />,
        children: [
          {
            path: "login",
            element: <LoginPage />,
          },
        ],
      },
    ],
  },
]);
