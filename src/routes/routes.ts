import React from "react";

import { AUTH_ROUTES } from "./constants";
import { RouterElementInterface } from "./model";

const SignIn = React.lazy(() => import("@/containers/auth/SignIn"));

const routes_admin: RouterElementInterface[] = [];

const routes_auth: RouterElementInterface[] = [
  {
    key: "auth-1",
    path: AUTH_ROUTES?.SIGN_IN,
    component: SignIn,
    name: "auth-sign-in",
  },
];

export { routes_auth, routes_admin };
