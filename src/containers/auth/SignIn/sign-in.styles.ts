import { Form } from "antd";
import { Option } from "antd/es/mentions";

import Select from "@/components/common/Select";
import Button from "@/components/common/Button";
import Typography from "@/components/common/Typography";

import { css, styled } from "styled-components";

export const SignInWrap = styled.section``;

export const HeaderWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const Logo = styled.img``;

export const MultipleLangWrap = styled.div`
  display: flex;
  align-items: center;

  p {
    cursor: pointer;
  }
`;

export const NeedHelp = styled(Typography)``;

export const ChangeLang = styled(Select)`
  min-width: 125px;
  width: fit-content;

  .ant-select-selector {
    border: none !important;
    padding: 0px !important;

    .ant-select-selection-search-input {
    }

    .ant-select-selection-item {
      justify-content: flex-start !important;
    }

    .ant-select-selection-item {
      display: flex !important;
      align-items: center;
      justify-content: center;
      gap: 8px;
    }
  }

  .ant-select-arrow {
    margin-top: -3px;
  }
`;

export const LangOption = styled(Option)`
  display: flex;
  align-items: center;
  gap: 4px;
`;

export const Divider = styled.div`
  width: 0.5px;
  height: 24px;
  background-color: ${(props) => props?.theme?.colors?.newtralDarker};
  margin: 0 12px;
`;

export const SignInForm = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  padding: 136px 0;

  @media ${(props) => props?.theme?.breakpoints?.xxlMax} {
    padding: 100px 0;
  }

  @media ${(props) => props?.theme?.breakpoints?.xlMax} {
    padding: 80px 0;
  }

  @media ${(props) => props?.theme?.breakpoints?.lgMax} {
    padding: 50px 0;
  }

  @media ${(props) => props?.theme?.breakpoints?.mdMax} {
    padding: 30px 0;
  }

  @media ${(props) => props?.theme?.breakpoints?.smMax} {
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
`;

export const ForgotPassword = styled.div`
  display: flex;
  justify-content: flex-end;

  margin-bottom: 30px;
`;

export const LoginButton = styled(Button)`
  margin-top: 12px;

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
