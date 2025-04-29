const preRouterAdmin = "/";
const preRouterAuth = "/auth";
const preRouterMain = "";

const ADMIN_ROUTES = {
  DASHBOARD: preRouterAdmin,
  FORBIDDEN: "/403",
};

const AUTH_ROUTES = {
  SIGN_IN: `${preRouterAuth}/sign-in`,
  SIGN_UP: `${preRouterAuth}/sign-up`,
  FORGOT_PASSWORD: `${preRouterAuth}/forgot-password`,
  DESIGN_SYSTEM: `${preRouterAuth}/design-system`,
};

const MAIN_ROUTES = {
  HOME: "/",
  INBOX: `${preRouterMain}/inbox`,
};

export { ADMIN_ROUTES, AUTH_ROUTES, MAIN_ROUTES };
