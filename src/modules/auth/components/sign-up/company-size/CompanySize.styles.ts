import { Form } from 'antd';

import Button from '@/shared/components/common/Button';
import Typography from '@/shared/components/common/Typography';

import { css, styled } from 'styled-components';

export const SignInWrap = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const SignInForm = styled.div`
  max-width: 450px;
`;

export const FormWrap = styled(Form)`
  width: 100%;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
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
  max-width: 400px;
  width: 100%;

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
  max-width: 400px;

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

export const SizeWrap = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

export const ButtonSize = styled(Button)<{ $isActive?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  height: 47px;
  color: ${(props) => props?.theme?.colors?.newtralLight} !important;

  .ant-image {
    height: 20px;
    width: 20px;

    .ant-image-img {
      vertical-align: top;
    }
  }

  max-width: 140px;
  padding: 13px 20px;
  font-weight: ${(props) => props?.theme?.fontWeight?.regular};
  border-color: ${(props) => props?.theme?.colors?.newtral};

  ${({ $isActive }) =>
    $isActive &&
    css`
      color: ${(props) => props?.theme?.colors?.secondaryDark} !important;
      border-color: ${(props) =>
        props?.theme?.colors?.secondaryDark} !important;
      background: #edf1f8;
    `}
`;
