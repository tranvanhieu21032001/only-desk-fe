import Button from '@/shared/components/common/Button';

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
  padding: 13px 24px;

  border-bottom: 1px solid ${(props) => props?.theme?.colors?.newtral};
`;

export const ModalHeaderContent = styled.div``;

export const ModalContent = styled.div`
  padding: 24px 48px 0;
  border-bottom: 1px solid ${(props) => props?.theme?.colors?.newtral};

  @media ${(props) => props?.theme?.breakpoints?.lgMax} {
    padding: 12px 12px 0;
  }
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

export const ActionWrap = styled.div`
  display: flex;
  gap: 12px;

  button {
    flex: 1;
  }

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

export const FormWrap = styled.div`
  width: 100%;
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

export const SensitiveActionWrap = styled.div``;

export const SensitiveAction = styled.div`
  margin: 24px 0 24px;

  display: grid;
  gap: 12px;
  grid-template-columns: repeat(2, 1fr);

  @media ${(props) => props?.theme?.breakpoints?.smMax} {
    grid-template-columns: repeat(1, 1fr);
  }
`;

export const SensitiveActionCard = styled.div<{ $isActive?: boolean }>`
  width: 100%;

  padding: 12px 16px;
  border: 1px solid ${(props) => props.theme.colors.newtral};
  border-radius: ${(props) => props.theme.radius?.normalRadius};

  display: flex;
  align-items: center;
  gap: 12px;

  ${({ $isActive }) =>
    $isActive &&
    css`
      background-color: ${(props) => props.theme.colors.secondaryLight};
    `}

  cursor: pointer;

  &:hover {
    transition: all 0.3s ease-in-out;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
    background-color: ${(props) => props.theme.colors.secondaryLight};
  }
`;

export const SensitiveActionCardContent = styled.div``;

export const VerifyYourPassword = styled.div<{
  $isValueVerifyPassword?: string;
}>`
  padding-top: 24px;

  .ant-input-affix-wrapper {
    height: 63px;
    padding: 12px;
  }

  .ant-input-suffix {
    height: 39px;

    div {
      height: 100%;

      svg {
        height: 39px;
        color: ${(props) => props.theme.colors.newtralDarker};
        opacity: 0.7;
      }
    }
  }

  /* ${({ $isValueVerifyPassword }) =>
    $isValueVerifyPassword &&
    css`
      svg {
        color: ${(props) => props.theme.colors.secondaryDarker} !important;
        opacity: 1 !important;
      }
    `} */
`;

export const SuccessWrap = styled.div`
  padding: 12px;
  margin: 24px 0;

  display: flex;
  gap: 16px;

  border: 1px solid ${(props) => props?.theme?.colors?.newtral};
  border-radius: ${(props) => props?.theme?.radius?.normalRadius};

  box-shadow: 0px 0px 3px 0px #0000001a;

  img {
    width: 24px !important;
  }
`;

export const Success = styled.div``;

export const Description = styled.div`
  margin-bottom: 24px;
`;
