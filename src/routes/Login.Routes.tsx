import { lazy, Suspense } from "react";
import LoginLayout from "../layout/LoginLayout";

const Login = lazy(() => import("../component/common/Loginform"));

export const LoginRoutes = {
  element: <LoginLayout />,
  path: "/",
  children: [
    {
      path: "login",
      element: (
        <Suspense fallback={<p>...Loading</p>}>
          <Login />
        </Suspense>
      ),
    },
  ],
};
