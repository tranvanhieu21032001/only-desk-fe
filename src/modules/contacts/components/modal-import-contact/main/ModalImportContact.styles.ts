import {
  ImportProgressEnums,
  StatusProceedEnums,
} from '../../../helpers/contact.enums';

import styled, { css } from 'styled-components';

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
  padding: 12px 24px;

  border-bottom: 1px solid ${(props) => props?.theme?.colors?.newtral};

  @media ${(props) => props?.theme?.breakpoints?.mdMax} {
    padding: 12px;
  }
`;

export const ModalHeaderContent = styled.div``;

export const ModalContent = styled.div`
  padding: 24px 48px;

  @media ${(props) => props?.theme?.breakpoints?.xxlMax} {
    padding: 12px 24px;
  }
`;

export const ModalDescription = styled.div`
  p {
    font-size: ${(props) => props?.theme?.fontSize?.sm};
  }
`;

export const ModalFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: 12px 24px;
  border-top: 1px solid ${(props) => props?.theme?.colors?.newtral};

  button {
    width: fit-content;

    .anticon-plus-circle {
      width: 18px;
      height: 18px;

      svg {
        width: 18px;
        height: 18px;
      }
    }
  }

  @media ${(props) => props?.theme?.breakpoints?.smMax} {
    flex-direction: column;
    gap: 12px;

    align-items: flex-start;
  }
`;

export const ModalFooterProceed = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;

  padding: 12px 24px;
  border-top: 1px solid ${(props) => props?.theme?.colors?.newtral};

  button {
    width: fit-content;

    .anticon-plus-circle {
      width: 18px;
      height: 18px;

      svg {
        width: 18px;
        height: 18px;
      }
    }
  }
`;

export const DownloadDocument = styled.div`
  p {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;

    color: #253a8e;
    text-transform: capitalize;

    div {
      height: 18px;
      display: flex;
      align-items: center;
    }

    &:hover {
      cursor: pointer;
      text-decoration: underline;
    }
  }
`;

export const ActionWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 12px;

  span {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
  }

  @media ${(props) => props?.theme?.breakpoints?.smMax} {
    width: 100%;
  }
`;

export const ProgressContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  @media ${(props) => props?.theme?.breakpoints?.smMax} {
    justify-content: flex-start !important;
  }
`;

export const IcProgress = styled.div<{
  $isActive?: ImportProgressEnums;
}>`
  .progress-icon {
    width: 32px;
    height: 32px;

    border-radius: 100px;
    border: 1px solid ${(props) => props?.theme?.colors?.newtral};

    display: flex;
    align-items: center;
    justify-content: center;

    div {
      height: 20px;
    }

    svg {
      color: ${(props) => props?.theme?.colors?.newtralLight};
    }
  }

  ${({ $isActive }) =>
    $isActive &&
    css`
      .progress-icon {
        border: none;
        background-color: ${(props) => props?.theme?.colors?.secondaryLight};

        svg {
          color: #253a8e;
        }
      }
    `}

  @media ${(props) => props?.theme?.breakpoints?.smMax} {
    .progress-icon {
      width: 24px;
      height: 24px;

      svg {
        width: 14px;
        height: 14px;
      }
    }
  }
`;

export const ProgressWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  width: 70%;

  @media ${(props) => props?.theme?.breakpoints?.smMax} {
    width: 100%;
  }
`;

export const Progress = styled.div<{
  $isDiver?: boolean;
  $isActiveDiver?: boolean;
  $isActiveDiverSecond?: boolean;
}>`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 8px;

  ${({ $isDiver }) => {
    return (
      $isDiver &&
      css`
        min-width: 25%;
        border-radius: 100px;
        border: 2px solid ${({ theme }) => theme.colors.newtral};

        margin-top: -22px;

        @media ${(props) => props?.theme?.breakpoints?.smMax} {
          min-width: 15%;
        }
      `
    );
  }}

  ${({ $isActiveDiver }) => {
    return (
      $isActiveDiver &&
      css`
        border-color: #389e0d;
      `
    );
  }}

   ${({ $isDiver, $isActiveDiverSecond }) => {
    return (
      $isActiveDiverSecond &&
      $isDiver &&
      css`
        border-color: #389e0d;
      `
    );
  }}

   @media ${(props) => props?.theme?.breakpoints?.smMax} {
    p {
      font-size: ${(props) => props?.theme?.fontSize?.xs};
    }
  }
`;

export const Description = styled.div`
  margin-top: 24px;

  @media ${(props) => props?.theme?.breakpoints?.mdMax} {
    margin-top: 12px;
  }
`;

export const UploadField = styled.div`
  width: 100%;
  height: 216px;

  margin-top: 24px;

  @media ${(props) => props?.theme?.breakpoints?.mdMax} {
    margin-top: 12px;
  }
`;

export const FilePreviewWrap = styled.div`
  margin-top: 24px;
  display: flex;
  flex-direction: column;
  gap: 6px;

  max-height: 160px;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 4px;
  }

  @media ${(props) => props?.theme?.breakpoints?.mdMax} {
    margin-top: 12px;
  }
`;

export const ConfigureContent = styled.div`
  margin-top: 24px;

  .ant-tabs-tab {
    margin-left: 0px !important;
    padding: 16px 8px;

    &.ant-tabs-tab-active {
      p {
        color: ${(props) => props?.theme?.colors?.secondaryDarker};
      }

      .count-tabs {
        border: none;
        background-color: ${(props) => props?.theme?.colors?.secondaryDarker};

        p {
          color: ${(props) => props?.theme?.colors?.newtralLightest};
        }
      }
    }
  }

  .ant-tabs-ink-bar {
    background-color: ${(props) =>
      props?.theme?.colors?.secondaryDarker} !important;
  }
`;

export const TabsWrap = styled.div`
  display: flex;
  gap: 4px;
  align-items: center;
`;

export const CountTabs = styled.div`
  border-radius: 100px;
  border: 1px solid ${(props) => props?.theme?.colors?.newtralLight};

  width: 32px;
  height: 32px;

  display: flex;
  align-items: center;
  justify-content: center;
`;

export const TabHeaderWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  border-bottom: 1px solid ${(props) => props?.theme?.colors?.newtral};

  .ant-tabs-nav {
    margin-bottom: 0px;

    &::before {
      display: none;
    }
  }

  @media ${(props) => props?.theme?.breakpoints?.mdMax} {
    flex-direction: column;
    align-items: flex-start;
  }
`;

export const TabHeader = styled.div`
  display: flex;
  gap: 24px;
  align-items: center;
  justify-content: center;
`;

export const Header = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  justify-content: center;
`;

export const ColumnSeparator = styled.div`
  width: 39px;
  height: 39px;

  display: flex;
  align-items: center;
  justify-content: center;

  border: 1px solid ${(props) => props?.theme?.colors?.newtral};
  border-radius: ${(props) => props?.theme?.radius?.normalRadius};
`;

export const ProceedImg = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  margin-top: 24px;

  img {
    width: 100%;
    height: 100%;

    max-width: 200px;
    max-height: 200px;
  }
`;

export const StatusWrap = styled.div`
  margin-top: 12px;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
`;

export const Status = styled.div<{ $status?: string }>`
  display: flex;
  gap: 4px;
  align-items: center;

  padding: 8px 10px;
  border-radius: ${(props) => props?.theme?.radius?.normalRadius};

  ${({ $status }) => {
    switch ($status) {
      case StatusProceedEnums?.CONTACTS_IMPORTED:
        return css`
          background-color: #e4f9d2;
          p {
            color: #389e0d;
          }
        `;
      case StatusProceedEnums?.SKIPPED:
        return css`
          background-color: #feece6;

          p {
            color: #fa541c;
          }
        `;
      case StatusProceedEnums?.REMAINING:
        return css`
          background-color: #e7fdfe;

          p {
            color: #08979c;
          }
        `;
      default:
        break;
    }
  }}
`;
