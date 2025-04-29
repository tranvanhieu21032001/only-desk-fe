import React, { Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { routes_auth, routes_main } from "./routes";

import { ADMIN_ROUTES } from "./constants";

import ErrorBoundary from "./ErrorBoundary";
import Forbidden from "@/modules/admin/Forbidden/index";
import AuthLayout from "../../shared/components/layouts/Auth";
import useWithAuth from "@/shared/HOCS/withAuth";
import MainLayout from "@/shared/components/layouts/Main";

interface ComponentRouteProps {
  component: React.ComponentType;
}

// Wrapper component for public (authenticated) routes
function PrivateRouteWrapper({ component: Component }: ComponentRouteProps) {
  const WrappedComponent = useWithAuth(Component);
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
  const WrappedComponent = useWithAuth(Component);
  return (
    <MainLayout>
      <Suspense fallback={<></>}>
        <WrappedComponent />
      </Suspense>
    </MainLayout>
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
          {routes_auth?.map((route) => (
            <Route
              key={route.key}
              path={route.path}
              element={<PrivateRouteWrapper component={route.component} />}
            />
          ))}

          {routes_main?.map((route) => (
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
