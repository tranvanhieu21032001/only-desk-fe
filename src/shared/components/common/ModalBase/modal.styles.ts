import { Modal } from 'antd';

import styled, { css } from 'styled-components';

export const ModalCustom = styled(Modal)<{ $isFullScreen: boolean }>`
  ${({ $isFullScreen }) =>
    $isFullScreen &&
    css`
      width: 100vw !important;
    `}

  .ant-modal-content {
    border-radius: 8px !important;
    padding: 0px !important;

    ${({ $isFullScreen }) =>
      $isFullScreen &&
      css`
        max-height: calc(100vh - 20px) !important;
        min-height: calc(100vh - 20px) !important;
        padding: 30px !important;
        overflow: auto;
      `}
  }

  .ant-modal-close {
    color: ${({ theme }) => theme.colors.newtralLight} !important;

    &:hover {
      background-color: unset !important;
      transform: rotate(180deg);
      transition: transform 0.3s ease-in-out;
    }

    &:not(:hover) {
      transform: rotate(0deg);
      transition: transform 0.3s ease-in-out;
    }
  }
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;

  padding-top: 16px;
`;

export const Content = styled.div<{ $isScroll: boolean }>`
  ${(props) =>
    props?.$isScroll &&
    css`
      max-height: 80vh;
      overflow: scroll;
      &::-webkit-scrollbar {
        width: 0 !important;
        display: none;
      }
    `}
`;

export const Footer = styled.div`
  display: flex;
  justify-content: center;
  gap: 24px;
  /* padding: 0px 32px 24px; */

  .ant-btn {
    width: auto !important;
  }
`;

export const WrapIcons = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;

  position: absolute;
  right: 16px;
  top: 16px;

  svg {
    font-size: 24px;
    cursor: pointer;
    color: ${({ theme }) => theme.colors.newtral};

    &:hover {
      color: ${({ theme }) => theme.colors.primary};
    }
  }
`;
