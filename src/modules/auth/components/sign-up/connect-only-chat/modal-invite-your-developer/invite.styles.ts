import { Form } from "antd";

import Button from "@/shared/components/common/Button";

import styled, { css } from "styled-components";

export const WrapModal = styled.div``;

export const Warning = styled.div`
  margin-bottom: 24px;

  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  text-align: center;

  img {
    width: 64px;
    height: auto;
  }
`;

export const ModalHeader = styled.div`
  display: flex;
  gap: 16px;
  padding: 13px 24px;

  border-bottom: 1px solid ${(props) => props?.theme?.colors?.newtral};
`;

export const ModalHeaderContent = styled.div``;

export const ModalContent = styled.div`
  padding: 24px;
  border-bottom: 1px solid ${(props) => props?.theme?.colors?.newtral};
`;

export const ModalBottom = styled.div`
  padding: 13px 24px;

  display: flex;
  gap: 12px;
  align-items: center;
  justify-content: flex-end;

  @media ${(props) => props?.theme?.breakpoints?.smMax} {
    flex-direction: column;
    align-items: flex-start;
  }
`;

export const CopyInviteLinkWrap = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-left: 16px;

  p {
    cursor: pointer;

    &:hover {
      text-decoration: underline;
    }
  }
`;

export const ActionWrap = styled.div`
  display: flex;
  gap: 12px;

  button {
    flex: 1;
  }

  @media ${(props) => props?.theme?.breakpoints?.smMax} {
    width: 100%;
  }
`;

export const BtnCancel = styled.div`
  button {
    color: ${(props) => props?.theme?.colors?.errorDark};
    border-color: ${(props) => props?.theme?.colors?.errorDark};
  }

  @media ${(props) => props?.theme?.breakpoints?.smMax} {
    width: 100%;
    max-width: 100%;
    flex: 1;
  }
`;

export const FormWrap = styled(Form)`
  width: 100%;
`;

export const AddMoreEmailWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const EmailsWrap = styled.div`
  max-height: 50vh;
  overflow-y: scroll;

  &::-webkit-scrollbar {
    width: 3px;
    height: 3px;
  }
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

export const EmailWrap = styled.div<{ $isFirst?: boolean }>`
  display: flex;
  gap: 12px;
  align-items: center;
  position: relative;

  .ant-form-item {
    margin-bottom: 0px;
    width: 92%;

    ${({ $isFirst }) =>
      $isFirst &&
      css`
        width: 98% !important;
      `}
  }

  .ant-image {
    position: absolute;
    right: 10px;
    top: 12px;

    .ant-image-img {
      cursor: pointer;
    }

    @media ${(props) => props?.theme?.breakpoints?.smMax} {
      right: 0px;
    }
  }
`;
