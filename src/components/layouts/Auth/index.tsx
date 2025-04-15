import React from "react";

import * as S from "./auth.styles";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <S.WrapAuthLayout>{children}</S.WrapAuthLayout>;
}
