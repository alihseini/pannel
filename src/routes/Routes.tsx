import { createBrowserRouter } from "react-router-dom";
import { LandingRoutes } from "./Landing.Routes";
import { LoginRoutes } from "./Login.Routes";
import { PannelRoute } from "./Pannel.Routes";
import { ErrorRoute } from "./Error.Routes";

const router = createBrowserRouter([LandingRoutes, LoginRoutes, PannelRoute,ErrorRoute]);

export default router;
