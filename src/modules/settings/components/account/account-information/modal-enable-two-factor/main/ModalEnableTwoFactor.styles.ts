import { EnableTwoFactorEnums } from '@/modules/settings/helpers/enums/account';

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

export const ModalDescription = styled.div`
  p {
    font-size: ${(props) => props?.theme?.fontSize?.sm};
  }
`;

export const ModalFooter = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
  justify-content: flex-end;

  padding: 12px 24px;
  border-top: 1px solid ${(props) => props?.theme?.colors?.newtral};

  span {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
  }

  button {
    width: fit-content;
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
  $isActive?: EnableTwoFactorEnums;
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
  width: 90%;

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

export const CautionWrap = styled.div`
  padding: 12px;
  margin-top: 24px;

  display: flex;
  gap: 16px;

  border: 1px solid ${(props) => props?.theme?.colors?.newtral};
  border-radius: ${(props) => props?.theme?.radius?.normalRadius};

  box-shadow: 0px 0px 3px 0px #0000001a;

  img {
    width: 24px !important;
  }
`;

export const Caution = styled.div``;

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
`;

export const ScanQrCode = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  margin-top: 24px;

  img {
    width: 30%;
    max-width: 250px;
    aspect-ratio: 1/1;
  }
`;

export const CopyInviteLink = styled.div`
  margin-top: 24px;

  width: 100%;
  padding: 4px 8px;
  background-color: ${(props) => props?.theme?.colors?.secondaryLight};

  display: flex;
  align-items: center;
  justify-content: space-between;

  p {
    width: 65%;
  }

  button {
    width: fit-content;
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

export const VerifyCode = styled.div`
  margin-top: 24px;
`;
