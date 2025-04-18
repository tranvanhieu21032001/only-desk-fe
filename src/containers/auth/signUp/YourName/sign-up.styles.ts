import { Form } from "antd";

import Button from "@/components/common/Button";
import Typography from "@/components/common/Typography";

import { css, styled } from "styled-components";

export const SignInWrap = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const SignInForm = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  padding: 50px 0;

  @media ${(props) => props?.theme?.breakpoints?.xlMax} {
    padding: 40px 0;
  }

  @media ${(props) => props?.theme?.breakpoints?.lgMax} {
    padding: 30px 0;
  }

  @media ${(props) => props?.theme?.breakpoints?.mdMax} {
    padding: 20px 0;
  }
`;

export const FormWrap = styled(Form)`
  width: 100%;
  max-width: 400px;
`;

export const Title = styled(Typography)`
  margin-bottom: 4px !important;
`;

export const Subtitle = styled(Typography)`
  text-align: center;
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

export const YouAgree = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;

  margin-bottom: 24px;
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
      margin: 0 !important;

      .ant-form-item-control-input-content {
        display: flex;
        align-items: center;
        gap: 8px;

        .ant-checkbox-label {
          display: none;
        }
      }
    `}
`;

export const LoginButton = styled(Button)`
  margin-top: 36px;

  display: flex;
  gap: 8px;
  align-items: center;
  justify-content: center;

  .ant-image-mask-info {
    height: 20px;
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
