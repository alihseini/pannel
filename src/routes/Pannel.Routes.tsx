import { lazy, Suspense } from "react";
import PannelLayout from "../layout/PannelLayout";

const Users = lazy(() => import("../component/common/Users"));

export const PannelRoute = {
  element: <PannelLayout />,
  path: "/",
  children: [
    {
      index: true,
      element: (
        <Suspense fallback={<p>...Loading</p>}>
          <Users />
        </Suspense>
      ),
    },
  ],
};
