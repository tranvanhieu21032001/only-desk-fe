import Typography from "@/components/common/Typography";

import { styled } from "styled-components";

export const SignInWrap = styled.section`
  padding-top: 20px;
`;

export const SignInForm = styled.div``;

export const FormWrap = styled.div`
  width: 100%;
  max-width: 400px;

  display: flex;
  align-items: center;

  flex-direction: column;
  justify-content: center;
`;

export const Title = styled(Typography)`
  margin-bottom: 4px !important;
`;

export const LoginLabelWrap = styled.div`
  margin-bottom: 36px;

  @media ${(props) => props?.theme?.breakpoints?.smMax} {
    margin-bottom: 24px;
  }
`;
