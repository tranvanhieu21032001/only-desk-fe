import { Form } from 'antd';

import Button from '@/shared/components/common/Button';
import Typography from '@/shared/components/common/Typography';

import { styled } from 'styled-components';

export const SignInWrap = styled.section``;

export const SignInForm = styled.div``;

export const FormWrap = styled(Form)`
  width: 100%;
  max-width: 400px;
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

export const EmailWrap = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
  position: relative;

  .ant-form-item {
    margin-bottom: 0px;
    width: 90%;
  }

  .ant-image {
    position: absolute;
    right: 0;
    top: 12px;

    .ant-image-img {
      cursor: pointer;
    }
  }
`;

export const AddMoreEmailWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const AddMoreEmail = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  &:hover p {
    text-decoration: underline;
  }

  .ant-image-mask {
    width: 16px;
    height: 16px;
  }
`;

export const CopyInviteLinkWrap = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  margin-top: 12px;

  p {
    &:hover {
      text-decoration: underline;
      cursor: pointer;
    }
  }
`;
