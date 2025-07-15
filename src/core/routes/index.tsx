import React, { Suspense, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { routes_auth, routes_main } from './routes';

import { ADMIN_ROUTES, getBreadcrumbMap, MAIN_ROUTES } from './constants';

import ErrorBoundary from './ErrorBoundary';
import Forbidden from '@/modules/admin/Forbidden/index';
import AuthLayout from '../../shared/components/layouts/Auth';
import useWithAuth from '@/shared/HOCS/withAuth';
import MainLayout from '@/shared/components/layouts/Main';
import useWithoutAuth from '@/shared/HOCS/withoutAuth';
import { BreadcrumbItem } from './model';
import { useTitle } from '../context/TitleContext';
import { useTranslation } from 'react-i18next';

interface ComponentRouteProps {
  component: React.ComponentType;
}

interface BreadcrumbResult {
  title: string;
  subtitle: string[];
  path: string;
}

const getBreadcrumbByPath = (
  pathname: string,
  t: (key: string) => string,
): BreadcrumbResult => {
  const map = getBreadcrumbMap(t);

  const normalizePath = (path: string): string =>
    path.endsWith('/') && path !== '/' ? path.slice(0, -1) : path;

  const findMatch = (
    items: BreadcrumbItem[],
    target: string,
    parentTrail: string[] = [],
  ): BreadcrumbResult | null => {
    for (const item of items) {
      const isDynamic = item.path.includes(':');
      const staticPath = normalizePath(item.path);
      const targetPath = normalizePath(target);

      const matched =
        (!isDynamic && staticPath === targetPath) ||
        (isDynamic &&
          new RegExp(`^${staticPath.replace(/:[^/]+/g, '[^/]+')}$`).test(
            targetPath,
          ));

      const trail = [...parentTrail, ...(item.breadcrumb || [])];

      if (matched) {
        return {
          title: trail[0] || '',
          subtitle: trail.slice(1),
          path: item.path,
        };
      }

      if (item.children) {
        const child = findMatch(item.children, targetPath, trail);
        if (child) return child;
      }
    }
    return null;
  };

  return (
    findMatch(map, pathname) || {
      title: 'Page',
      subtitle: [],
      path: '',
    }
  );
};

function TitleUpdater() {
  const location = useLocation();
  const { setTitle, setBreadCrumb, setTitlePath } = useTitle();
  const { t } = useTranslation('auth');

  useEffect(() => {
    const { title, subtitle, path } = getBreadcrumbByPath(location.pathname, t);
    setTitle(title);
    setBreadCrumb(subtitle);
    setTitlePath(path);
  }, [location.pathname, t]);

  return null;
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
          <TitleUpdater />
        <Routes>
          {/* Landing page route */}
          <Route
            path={MAIN_ROUTES.HOME}
            element={
              <NoLayoutWrapper
                component={React.lazy(() => import('@/modules/landing'))}
              />
            }
          />

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
