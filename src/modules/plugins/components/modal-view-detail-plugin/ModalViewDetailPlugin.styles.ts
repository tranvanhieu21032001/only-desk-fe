import { Col, Row } from 'antd';

import Button from '@/shared/components/common/Button';

import styled, { css } from 'styled-components';
import { PluginsTypeEnums } from '../../helpers/enums/allPlugins';
import themeColors from '@/shared/styles/themes/default/colors';

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
  padding: 24px 48px;

  @media ${(props) => props?.theme?.breakpoints?.xxlMax} {
    padding: 12px 24px;
  }
`;

export const ContentHeader = styled(Row)`
  & > *:not(:last-child) {
    border-right: 1px dashed ${(props) => props?.theme?.colors?.newtral};
  }
`;

export const LogoPlugin = styled.div`
  display: flex;
  gap: 24px;

  img {
    object-fit: cover;
    border-radius: ${(props) => props?.theme?.radius?.smallRadius};
    border: 1px solid ${(props) => props?.theme?.colors?.newtral};
  }

  @media ${(props) => props?.theme?.breakpoints?.mdMax} {
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
`;

export const Messaging = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;

  p {
    color: ${(props) => props?.theme?.colors?.newtralDark};
  }
`;

export const WebsiteWrap = styled(Col)`
  display: flex;
  flex-direction: column;
  gap: 8px;
  justify-content: space-between;
`;

export const Website = styled.div``;

export const InfoPlugin = styled.div`
  width: calc(100% - 24px - 130px);

  @media ${(props) => props?.theme?.breakpoints?.mdMax} {
    width: 100%;
  }
`;

export const LabelPlugin = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  justify-content: space-between;

  p {
    font-size: 20px;
  }
`;

export const BodyPlugin = styled.div`
  margin-top: 12px;
`;

export const DesignFul = styled.div`
  margin-top: 8px;
  display: flex;
  gap: 8px;
`;

export const Design = styled.div``;

export const ActionDesign = styled.div`
  margin-top: 4px;

  p {
    cursor: pointer;
    text-decoration: underline;

    &:hover {
      color: ${(props) => props?.theme?.colors?.secondary};
    }
  }
`;

export const ActionPlugin = styled.div`
  margin-top: 10px;

  display: flex;
  align-items: center;
  gap: 12px;
  justify-content: space-between;
`;

export const ActionInstallPlugin = styled.div`
  width: 100%;
  display: flex;
  gap: 12px;
  align-items: center;
`;

export const InstallPlugin = styled(Button)`
  span {
    display: flex;
    gap: 8px;
    align-items: center;
    justify-content: center;
  }
`;

export const UninstallPlugin = styled(Button)`
  span {
    display: flex;
    gap: 8px;
    align-items: center;
    justify-content: center;
  }
`;

export const Configure = styled(Button)`
  span {
    display: flex;
    gap: 8px;
    align-items: center;
    justify-content: center;
  }

  border-color: #253a8e;

  p {
    color: #253a8e;
  }

  svg {
    color: #253a8e;
  }
`;

export const ButtonVideo = styled(Button)`
  display: flex;
  align-items: center;
  gap: 10px;
  justify-content: center;
  width: fit-content;

  border-color: ${(props) => props?.theme?.colors?.newtral};

  .img {
    width: 20px !important;
    height: 20px !important;
  }
`;

export const Permissions = styled.div`
  margin-top: 8px;

  p {
    cursor: pointer;
    text-decoration: underline;
    color: ${(props) => props?.theme?.colors?.secondary};
  }
`;

export const PluginType = styled.div<{ $type: PluginsTypeEnums }>`
  cursor: pointer;
  padding: 4px 10px;
  border-radius: ${(props) => props?.theme?.radius?.normalRadius};

  p {
    font-size: ${(props) => props?.theme?.fontSize?.sm};
  }

  ${({ $type }) => {
    switch ($type) {
      case PluginsTypeEnums?.ESSENTIALS:
        return css`
          background-color: #e8f0fd;
          p {
            color: ${(props) => props?.theme?.colors?.secondary};
          }
        `;
      case PluginsTypeEnums?.MINI:
        return css`
          background-color: #e4f9d2;
          p {
            color: #389e0d;
          }
        `;
      case PluginsTypeEnums?.FREE:
        return css`
          background-color: #fce9f4;

          p {
            color: #c41d7f;
          }
        `;
      case PluginsTypeEnums?.PLUS:
        return css`
          background-color: #fde9e7;

          p {
            color: #d91f11;
          }
        `;
      default:
        return css`
          background-color: #f0e9fb;

          p {
            color: #531dab;
          }
        `;
    }
  }}
`;

export const ModalLineBreak = styled.div`
  border-bottom: 1px solid ${(props) => props?.theme?.colors?.newtral};
  padding: 12px 0;

  @media ${(props) => props?.theme?.breakpoints?.xxlMax} {
    padding: 6px 0;
  }
`;

export const ModalDescription = styled.div`
  padding: 0px 48px 24px;

  @media ${(props) => props?.theme?.breakpoints?.xxlMax} {
    padding: 0px 24px 12px;
  }
`;

export const Description = styled.div`
  max-height: 40vh;
  overflow-y: scroll;

  &::-webkit-scrollbar {
    width: 4px;
    height: 4px;
    color: ${(props) => props?.theme?.colors?.newtralLight};
  }

  @media ${(props) => props?.theme?.breakpoints?.mdMax} {
    max-height: 50vh;
  }
`;


export const WrappButton = styled.div`

border-top:1px solid ${themeColors?.newtral};
margin-top:24px;
  padding:12px 0 0 0;
  display: flex;
  gap: 12px;
  align-items: flex-end;
  justify-content:flex-end;
  button{
  width:fit-content;
  }
`;