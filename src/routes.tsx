import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "./pages/ErrorPage";
import LoginTest from "./pages/LoginDemo";

const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <ErrorPage />,
    children: [{ path: "", element: <LoginTest /> }],
  },
]);

export default router;
