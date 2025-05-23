import { lazy, Suspense } from "react";
import PannelLayout from "../layout/PannelLayout";
import { Navigate } from "react-router-dom";

const IndexUsers = lazy(() => import("../pages/pannel/IndexUsers"));
const NewEditUser = lazy(() => import("../pages/pannel/NewEditUser"));

export const PannelRoute = {
  element: <PannelLayout />,
  path: "/",
  children: [
    {
      index: true,
      element: <Navigate to="pannel/users" replace />,
    },
    {
      path: "pannel/users",
      element: (
        <Suspense fallback={<p>...Loading</p>}>
          <IndexUsers />
        </Suspense>
      ),
    },
    {
      path: "pannel/newUser",
      element: (
        <Suspense fallback={<p>...Loading</p>}>
          <NewEditUser />
        </Suspense>
      ),
    },
    {
      path: "pannel/editUser/:id",
      element: (
        <Suspense fallback={<p>...Loading</p>}>
          <NewEditUser />
        </Suspense>
      ),
    },
    {
      path: "pannel/test",
      element: <div>aaaaaaaaaaaaaaaaaaaaaaaa</div>,
    },
  ],
};
