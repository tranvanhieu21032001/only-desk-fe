import React, { useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useAppSelector } from "@/hooks";
import { AUTH_ROUTES } from "@/routes/constants";

export default function useWithAuth<
  P extends React.HTMLAttributes<HTMLElement>
>(Component: React.ComponentType<P>) {
  const navigate = useNavigate();

  const isAuth = useAppSelector((state) => state.auth.isAuth) || false;

  const handleAuthCheck = useCallback(() => {
    if (!isAuth) {
      navigate(AUTH_ROUTES.SIGN_IN, { replace: true });
    }
  }, [isAuth, navigate]);

  useEffect(() => {
    handleAuthCheck();
  }, [handleAuthCheck]);

  const WrapperComponent = (props: P) => {
    // if (isCheckPermission) {
    //   if (!permissionRbac) {
    //     return <Loading />;
    //   }

    //   if (!permissionRbac?.allowRead) {
    //     navigate(ADMIN_ROUTES.FORBIDDEN);
    //   }
    // }

    return <Component {...props} />;
  };

  return WrapperComponent;
}
