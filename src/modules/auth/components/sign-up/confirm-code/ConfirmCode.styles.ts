import { Form } from 'antd';

import Button from '@/shared/components/common/Button';
import Typography from '@/shared/components/common/Typography';

import { css, styled } from 'styled-components';

export const SignInWrap = styled.section``;

export const SignInForm = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

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

export const Gmail = styled.div`
  display: flex;
  margin-top: 36px !important;
  align-items: center;
  justify-content: center;

  button {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 8px;

    color: ${(props) => props?.theme?.colors?.newtralDark};
    border-color: ${(props) => props?.theme?.colors?.newtral};
  }
`;

export const FormWrap = styled(Form)`
  width: 100%;
  max-width: 780px;

  .otp-form-item {
    display: flex;
    align-items: center;
    justify-content: center;

    .otp-input-wrapper {
      gap: 12px;

      @media ${(props) => props?.theme?.breakpoints?.mdMax} {
        gap: 5px;
      }

      input {
        line-height: 29px;
        font-size: ${(props) => props?.theme?.fontSize?.lg};
        font-weight: ${(props) => props?.theme?.fontWeight?.semiBold};
        color: ${(props) => props?.theme?.colors?.primary};
        border-radius: 8px;
        border: 1px solid ${(props) => props?.theme?.colors?.newtral};
        box-shadow: 0px 2px 3px 0px #0a0d140d !important;

        width: 70px !important;
        height: 77px;

        @media ${(props) => props?.theme?.breakpoints?.mdMax} {
          width: 40px !important;
          height: 47px;
        }
      }
    }
  }
`;

export const Continue = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  button {
    max-width: 400px;
  }
`;

export const Title = styled(Typography)`
  margin-bottom: 4px !important;
`;

export const Subtitle = styled(Typography)`
  text-align: center;
`;

export const Sub = styled(Typography)`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const LoginLabelWrap = styled.div`
  margin-bottom: 36px;

  @media ${(props) => props?.theme?.breakpoints?.smMax} {
    margin-bottom: 24px;
  }
`;

export const InputNumber = styled.input`
  &[type='number']::-webkit-inner-spin-button,
  &[type='number']::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  &[type='number'] {
    -moz-appearance: textfield;
  }
`;

export const Email = styled.span`
  color: ${(props) => props?.theme?.colors?.primary};
  font-size: ${(props) => props?.theme?.fontSize?.base};
  font-weight: ${(props) => props?.theme?.fontWeight?.bold};
`;

export const SignInAction = styled.span`
  color: ${(props) => props?.theme?.colors?.secondary};
  font-size: ${(props) => props?.theme?.fontSize?.base};
  cursor: pointer;
  margin-left:8px;
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
