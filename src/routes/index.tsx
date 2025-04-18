import React, { Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { routes_admin, routes_auth, routes_main } from "./routes";

import { ADMIN_ROUTES, MAIN_ROUTES } from "./constants";
import useWithoutAuth from "../HOCS/withoutAuth";

import ErrorBoundary from "./ErrorBoundary";
import AuthLayout from "../components/layouts/Auth/index";
import Forbidden from "@/containers/admin/Forbidden/index";
import MainLayout from "@/components/layouts/Main";

interface ComponentRouteProps {
  component: React.ComponentType;
}

// Wrapper component for public (authenticated) routes
function PrivateRouteWrapper({ component: Component }: ComponentRouteProps) {
  const WrappedComponent = useWithoutAuth(Component);
  return (
    <AuthLayout>
      <Suspense fallback={<></>}>
        <WrappedComponent />
      </Suspense>
    </AuthLayout>
  );
}

// Wrapper component for public (unauthenticated) routes
function PublicRouteWrapper({ component: Component }: ComponentRouteProps) {
  const WrappedComponent = useWithoutAuth(Component);
  return (
    <AuthLayout>
      <Suspense fallback={<></>}>
        <WrappedComponent />
      </Suspense>
    </AuthLayout>
  );
}

// Wrapper component for routes after login
function MainRouteWrapper({ component: Component }: ComponentRouteProps) {
  const WrappedComponent = useWithoutAuth(Component);
  return (
    <MainLayout>
      <Suspense fallback={<></>}>
        <WrappedComponent />
      </Suspense>
    </MainLayout>
  );
}

// Direct component rendering without layout wrapper
function NoLayoutWrapper({ component: Component }: ComponentRouteProps) {
  const WrappedComponent = useWithoutAuth(Component);
  return (
    <Suspense fallback={<></>}>
      <WrappedComponent />
    </Suspense>
  );
}

function RedirectToLogin() {
  // const navigate = useNavigate();
  // React.useEffect(() => {
  //   navigate(AUTH_ROUTES.SIGN_IN);
  // }, [navigate]);
  return null; // This component does not render anything
}

export default function RouterRoot() {
  return (
    <ErrorBoundary>
      <Router>
        <Routes>
          {/* Landing page route */}
          <Route
            path={MAIN_ROUTES.HOME}
            element={
              <NoLayoutWrapper
                component={React.lazy(() => import("@/containers/landing"))}
              />
            }
          />

          {routes_admin.map((route) => (
            <Route
              key={route.key}
              path={route.path}
              element={<PrivateRouteWrapper component={route.component} />}
            />
          ))}

          {routes_auth.map((route) => (
            <Route
              key={route.key}
              path={route.path}
              element={<PublicRouteWrapper component={route.component} />}
            />
          ))}

          {routes_main
            .filter((route) => route.path !== MAIN_ROUTES.HOME)
            .map((route) => (
              <Route
                key={route.key}
                path={route.path}
                element={<MainRouteWrapper component={route.component} />}
              />
            ))}

          <Route path="*" element={<RedirectToLogin />} />
          <Route path={ADMIN_ROUTES.FORBIDDEN} element={<Forbidden />} />
        </Routes>
      </Router>
    </ErrorBoundary>
  );
}
