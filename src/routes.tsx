import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "./pages/ErrorPage";
import LoginDemo from "./pages/LoginDemo";

const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <ErrorPage />,
    children: [{ path: "", element: <LoginDemo /> }],
  },
]);

export default router;
