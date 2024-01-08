import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import NotFound from "../page/NotFound";
import Home from "../page/Home";
const routes = createBrowserRouter([
  {
    path: "/",
    element: <Home></Home>,
  },
  {
    path: "/project",
    element: <App />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default routes;
