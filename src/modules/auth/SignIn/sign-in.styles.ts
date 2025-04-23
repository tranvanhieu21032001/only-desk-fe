import { Form } from "antd";

import Button from "@/shared/components/common/Button";
import Typography from "@/shared/components/common/Typography";

import { css, styled } from "styled-components";

export const SignInWrap = styled.section``;

export const SignInForm = styled.div`
  padding-top: 20px;
`;

export const FormWrap = styled(Form)`
  width: 100%;
  max-width: 400px;
`;

export const Title = styled(Typography)`
  margin-bottom: 4px !important;
`;

export const Subtitle = styled(Typography)`
`;

export const LoginLabelWrap = styled.div`
  margin-bottom: 36px;

  @media ${(props) => props?.theme?.breakpoints?.smMax} {
    margin-bottom: 24px;
  }
`;

export const SignInAction = styled.span`
  text-transform: capitalize;
  color: ${(props) => props?.theme?.colors?.secondary};
  font-size: ${(props) => props?.theme?.fontSize?.base};
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

export const FormItem = styled(Form.Item)<{
  $margin?: string;
  $isRememberMe?: boolean;
}>`
  ${({ $margin }) =>
    $margin &&
    css`
      margin: ${$margin} !important;
    `}

  ${({ $isRememberMe }) =>
    $isRememberMe &&
    css`
      .ant-form-item-control-input-content {
        display: flex;
        align-items: center;
        gap: 8px;

        .ant-checkbox-label {
          display: none;
        }
      }
    `}

    .ant-checkbox-inner {
    box-shadow: 0px 2px 2px 0px #1b1c1d1f;
  }
`;

export const ForgotPassword = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
`;

export const LoginButton = styled(Button)`
  margin-top: 12px;
  text-transform: capitalize;

  display: flex;
  gap: 8px;
  align-items: center;
  justify-content: center;

  .ant-image-mask-info {
    height: 20px;
  }

  .ant-image-img {
    margin-top: -3px;
  }
`;

export const DriversLicenseWrap = styled.div`
  height: 1px;
  width: 100%;
  background-color: ${(props) => props?.theme?.colors?.newtral};

  margin: 36px 0;

  @media ${(props) => props?.theme?.breakpoints?.smMax} {
    margin-bottom: 24px;
  }
`;

export const RememberMe = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  height: 47px;
  padding: 12px;
  margin-bottom: 36px;

  background-color: ${(props) => props?.theme?.colors?.newtralLighter};

  border: 1px solid ${(props) => props?.theme?.colors?.newtral};
  border-radius: ${(props) => props?.theme?.radius?.normalRadius};
  box-shadow: 0px 2px 3px rgba(10, 13, 20, 0.05);

  .ant-form-item {
    margin-bottom: 0px;
  }
`;
