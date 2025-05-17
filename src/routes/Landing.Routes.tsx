import { Suspense } from "react";
import LandingLayout from "../layout/LandingLayout";

export const LandingRoutes = {
  element: <LandingLayout />,
  path: "/landing",
  children: [
    {
      path: "landing",
      element: (
        <Suspense fallback={<p>...Loading</p>}>
          <div>p</div>
        </Suspense>
      ),
    },
  ],
};
