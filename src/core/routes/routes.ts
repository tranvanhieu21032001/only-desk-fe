import React from "react";

import { AUTH_ROUTES, MAIN_ROUTES } from "./constants";
import { RouterElementInterface } from "./model";

const SignIn = React.lazy(() => import("@/modules/auth/SignIn"));
const SignUp = React.lazy(() => import("@/modules/auth/signUp/Main"));
const ForgotPassword = React.lazy(() => import("@/modules/auth/forgotPassword/Main"));

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
  {
    key: "forgot-password",
    path: AUTH_ROUTES?.FORGOT_PASSWORD,
    component: ForgotPassword,
    name: "auth-forgot-password",
  },
];

const routes_main: RouterElementInterface[] = [
    {
    key: "home",
    path: MAIN_ROUTES.HOME,
    component: LandingPage,
    name: "landing-page",
  },
  {
    key: "main-inbox",
    path: MAIN_ROUTES.INBOX,
    component: Main,
    name: "main-inbox",
  },
];

export { routes_auth, routes_admin, routes_main };
