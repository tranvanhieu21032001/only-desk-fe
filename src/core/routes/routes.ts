import React from "react";

import { AUTH_ROUTES, MAIN_ROUTES } from "./constants";
import { RouterElementInterface } from "./model";

const SignIn = React.lazy(() => import("@/modules/auth/SignIn"));
const SignUp = React.lazy(() => import("@/modules/auth/signUp/Main"));

const Main = React.lazy(() => import("@/modules/main/MainInbox"));
const LandingPage = React.lazy(() => import("@/modules/landing"));

const routes_admin: RouterElementInterface[] = [];

const routes_auth: RouterElementInterface[] = [
  {
    key: "sign-in",
    path: AUTH_ROUTES?.SIGN_IN,
    component: SignIn,
    name: "auth-sign-in",
  },
  {
    key: "sign-up-1",
    path: AUTH_ROUTES?.SIGN_UP,
    component: SignUp,
    name: "auth-sign-up",
  },
];

const routes_main: RouterElementInterface[] = [
  {
    key: "main-inbox",
    path: MAIN_ROUTES.INBOX,
    component: Main,
    name: "main-inbox",
  },
  {
    key: "home",
    path: MAIN_ROUTES.HOME,
    component: LandingPage,
    name: "landing-page",
  },
];

export { routes_auth, routes_admin, routes_main };
