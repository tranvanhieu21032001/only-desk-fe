import React, { Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { routes_admin, routes_auth } from "./routes";

import { ADMIN_ROUTES } from "./constants";
import useWithoutAuth from "../HOCS/withoutAuth";

import ErrorBoundary from "./ErrorBoundary";
import AuthLayout from "../components/layouts/Auth/index";
import Forbidden from "@/containers/admin/Forbidden/index";

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
          <Route path="*" element={<RedirectToLogin />} />
          <Route path={ADMIN_ROUTES.FORBIDDEN} element={<Forbidden />} />
        </Routes>
      </Router>
    </ErrorBoundary>
  );
}
