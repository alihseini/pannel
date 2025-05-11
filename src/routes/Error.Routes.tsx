import { lazy, Suspense } from "react";
import ErrorLayout from "../layout/ErrorLayout";

const Error403 = lazy(() => import("../pages/error/Error403"));
const Error404 = lazy(() => import("../pages/error/Error404"));
const Error500 = lazy(() => import("../pages/error/Error500"));

export const ErrorRoute = {
  element: <ErrorLayout />,
  path: "/",
  children: [
    {
      path: "/403",
      element: (
        <Suspense fallback={<p>...Loading</p>}>
          <Error403 />
        </Suspense>
      ),
    },
    {
      path: "*",
      element: (
        <Suspense fallback={<p>...Loading</p>}>
          <Error404 />
        </Suspense>
      ),
    },
    {
      path: "/500",
      element: (
        <Suspense fallback={<p>...Loading</p>}>
          <Error500 />
        </Suspense>
      ),
    },
  ],
};
