import { Col, Form, Row } from "antd";

import Button from "@/shared/components/common/Button";
import CollapseCustom from "@/shared/components/common/CollapseCustom";
import Typography from "@/shared/components/common/Typography";

import { styled } from "styled-components";

export const SignInWrap = styled.section``;

export const SignInForm = styled.div``;

export const FormWrap = styled(Form)`
  width: 100%;
  max-width: 1150px;

  display: flex;
  flex-direction: column;
  align-items: center;
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

export const ConnectOnlyChatCode = styled.div`
  max-width: 650px;
  width: 100%;

  box-shadow: 0px 0px 16px 0px #00000014;
  border-radius: ${(props) => props?.theme?.radius?.normalRadius};
`;

export const ConnectOnlyChatCodeHeader = styled.div`
  padding: 12px 24px;

  h4 {
    font-size: 20px;
  }
`;

export const ConnectOnlyChatCodeBody = styled.div`
  max-height: 240px;
  overflow-y: scroll;
  padding: 12px 24px;
  background-color: ${(props) => props?.theme?.colors?.secondaryLight};

  &::-webkit-scrollbar {
    width: 0px;
    height: 0px;
  }

  &:hover {
    &::-webkit-scrollbar {
      width: 3px !important;
      height: 3px !important;
    }
  }
`;

export const ConnectOnlyChatCodeBottom = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
  padding: 12px 24px;

  @media ${(props) => props?.theme?.breakpoints?.smMax} {
    flex-direction: column;
  }

  button {
    display: flex;
    gap: 8px;
    align-items: center;
    justify-content: center;
    width: fit-content;
  }
`;

export const StatusConnect = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
`;

export const StatusWrap = styled.div`
  p {
    position: relative;
    padding-left: 20px;

    &::before {
      content: "";
      position: absolute;
      top: 50%;
      left: 0;
      transform: translateY(-50%);
      width: 10px;
      height: 10px;
      background-color: ${(props) => props?.theme?.colors?.errorDark};
      border-radius: 50%;
    }
  }
`;

export const ConnectOnlyChatCodeInvite = styled.div`
  margin-top: 12px;
  padding: 12px 24px;
  border-radius: ${(props) => props?.theme?.radius?.normalRadius};
  background-color: ${(props) => props?.theme?.colors?.secondaryLight};
  max-width: 650px;
  width: 100%;

  display: flex;
  gap: 24px;
  align-items: center;
  justify-content: center;

  button {
    max-width: 175px;
    padding: 12px;
  }

  @media ${(props) => props?.theme?.breakpoints?.smMax} {
    flex-direction: column;
    gap: 12px;

    button {
      width: 100%;
      max-width: 100%;
    }
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

export const ButtonInstallGuide = styled.div`
  width: 175px;

  button {
    color: ${(props) => props?.theme?.colors?.errorDark};
    border-color: ${(props) => props?.theme?.colors?.errorDark};
  }

  @media ${(props) => props?.theme?.breakpoints?.smMax} {
    width: 100%;
    max-width: 100%;
  }
`;

export const ConnectPluginWrap = styled(Row)`
  margin-top: 36px;
`;

export const ConnectPlugin = styled(Col)``;

export const ConnectPluginTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const ConnectPluginCollapse = styled(CollapseCustom)``;

export const BtnConnect = styled.div`
  button {
    padding: 8px 16px;
  }
`;

export const BtnCheck = styled.div`
  width: 100%;

  button {
    padding: 8px 16px;
  }
`;

export const ConnectPluginAction = styled.div`
  display: flex;
  gap: 10px;
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
