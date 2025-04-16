import React from "react";

import { AUTH_ROUTES, MAIN_ROUTES } from "./constants";
import { RouterElementInterface } from "./model";

const SignIn = React.lazy(() => import("@/containers/auth/SignIn"));

const Main = React.lazy(() => import("@/containers/main/MainInbox"));

const routes_admin: RouterElementInterface[] = [];

const routes_auth: RouterElementInterface[] = [
  {
    key: "auth-1",
    path: AUTH_ROUTES?.SIGN_IN,
    component: SignIn,
    name: "auth-sign-in",
  },
];

const routes_main: RouterElementInterface[] = [
  {
    key: "main-inbox",
    path: MAIN_ROUTES.INBOX,
    component: Main,
    name: "main-inbox",
  },
];

export { routes_auth, routes_admin, routes_main };
