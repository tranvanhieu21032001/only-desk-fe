import React, { useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";

import { useAppSelector } from "@/hooks";
import { ADMIN_ROUTES } from "@/routes/constants";

export default function useWithoutAuth<
  P extends React.HTMLAttributes<HTMLElement>
>(Component: React.ComponentType<P>) {
  const navigate = useNavigate();
  const isAuth = useAppSelector((state) => state.auth.isAuth) || false;

  const handleAuthCheck = useCallback(() => {
    // if (isAuth) {
    //   if (isEmpty()) {
    //     <Loading />;
    //   } else {
    //     navigate(ADMIN_ROUTES.FORBIDDEN, {
    //       replace: true,
    //     });
    //   }
    // }
  }, [isAuth, navigate]);

  useEffect(() => {
    handleAuthCheck();
  }, [handleAuthCheck]);

  const WrapperComponent = (props: P) => {
    return <Component {...props} />;
  };

  return WrapperComponent;
}
