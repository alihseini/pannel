import { lazy, Suspense } from "react";
import PannelLayout from "../layout/PannelLayout";
import { Navigate } from "react-router-dom";

const TableSection = lazy(() => import("../pages/pannel/IndexTableSection"));

export const PannelRoute = {
  element: <PannelLayout />,
  path: "/",
  children: [
    {
      index: true, // این خط می‌گه این route برای path "/pannel" هست
      element: <Navigate to="pannel/users" replace />, // ریدایرکت به users
    },
    {
      path: "pannel/users",
      element: (
        <Suspense fallback={<p>...Loading</p>}>
          <TableSection />
        </Suspense>
      ),
    },
    {
      path: "pannel/test",
      element: <div>aaaaaaaaaaaaaaaaaaaaaaaa</div>,
    },
  ],
};
