import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAppSelector } from '@/shared/hooks';
import { AUTH_ROUTES, MAIN_ROUTES } from '@/core/routes/constants';

export default function useWithAuth<
  P extends React.HTMLAttributes<HTMLElement>,
>(Component: React.ComponentType<P>) {
  const navigate = useNavigate();

  const isAuth = useAppSelector((state) => state.auth.isAuth);
  const currentPath = new URL(window.location.href)?.pathname;

  useEffect(() => {
    if (!isAuth && !Object.values(AUTH_ROUTES).includes(currentPath)) {
      navigate(AUTH_ROUTES.SIGN_IN, { replace: true });
    } else if (isAuth && Object.values(AUTH_ROUTES).includes(currentPath)) {
      navigate(MAIN_ROUTES?.HOME, { replace: true });
    }
  }, [isAuth]);

  const WrapperComponent = (props: P) => {
    return <Component {...props} />;
  };

  return WrapperComponent;
}
