import { lazy, Suspense } from "react";
import PannelLayout from "../layout/PannelLayout";

const TableSection = lazy(() => import("../pages/pannel/TableSection"));

export const PannelRoute = {
  element: <PannelLayout />,
  path: "/",
  children: [
    {
      index: true,
      element: (
        <Suspense fallback={<p>...Loading</p>}>
          <TableSection />
        </Suspense>
      ),
    },
  ],
};
