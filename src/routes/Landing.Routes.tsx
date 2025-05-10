import { lazy, Suspense } from "react";
import LandingLayout from "../layout/LandingLayout";

const Users = lazy(() => import("../component/common/Users"));

export const LandingRoutes = {
  element: <LandingLayout />,
  path: "/",
  children: [
    {
      path: "",
      element: (
        <Suspense fallback={<p>...Loading</p>}>
          <Users />
        </Suspense>
      ),
    },
  ],
};
