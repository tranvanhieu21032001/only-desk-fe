import { Form } from "antd";

import Button from "@/components/common/Button";
import Typography from "@/components/common/Typography";

import { styled } from "styled-components";

export const SignInWrap = styled.section`
  padding-top: 20px;
`;

export const SignInForm = styled.div``;

export const FormWrap = styled(Form)`
  width: 100%;
  max-width: 580px;

  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
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

export const SocialChatWrap = styled.div`
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
`;

export const SocialChat = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 1px solid ${({ theme }) => theme?.colors?.newtral};
  border-radius: 8px;
  box-shadow: 0 2px 3px 0 rgba(10, 13, 20, 0.05);
  transition: box-shadow 0.3s ease-in-out;
  cursor: pointer;
  padding: 12px;
  width: calc(50% - 6px);

  .ant-form-item {
    margin-bottom: 0;
  }

  &:hover {
    box-shadow: 0 4px 6px 0 rgba(10, 13, 20, 0.15);

    img {
      animation: pulse 1.2s infinite;
    }
  }

  @keyframes pulse {
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.1);
    }
    100% {
      transform: scale(1);
    }
  }

  @media ${(props) => props?.theme?.breakpoints?.smMax} {
    width: 100%;
  }
`;

export const LogoChatWrap = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
`;
