import { Col } from 'antd';

import { css, styled } from 'styled-components';

export const NitificationsColumn = styled.div`
  display: flex;
  gap: 5px;
  flex-direction: column;

  height: calc(100vh - 80px);
  overflow-y: scroll;

  &::-webkit-scrollbar {
    width: 4px;
    height: 9px;
  }

  @media ${(props) => props?.theme?.breakpoints?.lgMax} {
    height: calc(100vh - 140px);
  }

  @media ${(props) => props?.theme?.breakpoints?.mdMax} {
    height: calc(100vh - 140px);
  }

  @media ${(props) => props?.theme?.breakpoints?.smMax} {
    height: calc(100vh - 180px);
  }

  @media ${(props) => props?.theme?.breakpoints?.xsMax} {
    height: calc(100vh - 220px);
  }
`;

export const NotificationsContainer = styled.section`
  // height: 100%;
  // overflow-y: auto;
`;

export const Notifications = styled.div`
  padding: 12px;
  background-color: ${(props) => props?.theme?.colors?.newtralLightest};

  .ant-form {
    overflow-y: auto;
  }
`;

export const LookingNotifications = styled.div`
  margin-top: 4px;
  padding: 20px 16px;
  background-color: ${(props) => props?.theme?.colors?.newtralLightest};

  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;

  button {
    height: 28px;
    width: fit-content;

    padding-top: 4px;
    padding-bottom: 4px;
  }
`;

export const NotificationsWarning = styled.div`
  border: 1px solid #ccc;
  padding: 10px;
  border-radius: 8px;
  margin-top: 20px;

  display: flex;
  justify-content: space-between;
  align-items: center;

  span {
    cursor: pointer;
    text-decoration: underline;
  }
`;

export const ManageNotifications = styled.div`
  border: 1px solid #ccc;
  padding: 10px;
  border-radius: 8px;
  margin-top: 20px;

  display: flex;
  gap: 10px;
  flex-direction: column;

  p {
    font-size: 14px;
    line-height: 23px;
    font-weight: 400;
  }
`;

export const WarningBox = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;

  p {
    font-size: 14px;
    line-height: 23px;
    font-wight: 400;
  }
`;

export const AccessSwitchInput = styled.input.attrs({ type: 'checkbox' })`
  opacity: 0;
  width: 0;
  height: 0;
  &:checked + span {
    background: ${(props) => props.theme.colors.borderDark};
  }
  &:checked + span:before {
    transform: translateX(20px);
  }
  &:disabled + span {
    background: ${(props) => props.theme.colors.borderDisabled};
    cursor: not-allowed;
  }
  &:disabled + span:before {
    background: ${(props) => props.theme.colors.newtral};
  }
`;

export const AccessSwitchWrapper = styled.label`
  position: relative;
  display: inline-block;
  width: 48px;
  height: 28px;
`;

export const DiffrentContainer = styled.div`
  padding: 10px;
  width: 100%;
  height: 60px;
  background: #fff;

  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const AutoSaveIndicator = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  background: #fff;
  border: 1px solid ${(props) => props.theme.colors.newtral};
  border-radius: 8px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.04);

  img {
    width: 16px;
    height: 16px;
  }

  p {
    color: #333;
    font-size: 15px;
    font-weight: 500;
    margin: 0;
  }
`;

export const AccessSwitchSlider = styled.span`
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: ${(props) => props.theme.colors.borderDisabled};
  border-radius: 999px;
  transition: background 0.2s;
  box-shadow: ${(props) => props.theme.shadow.smallShadow};
  &:before {
    content: '';
    position: absolute;
    left: 4px;
    top: 4px;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: ${(props) => props.theme.colors.newtralLightest};
    transition:
      transform 0.2s,
      background 0.2s;
    box-shadow: ${(props) => props.theme.shadow.smallShadow};
    display: flex;
    align-items: center;
    justify-content: center;
  }
  &:after {
    content: '';
    position: absolute;
    top: 50%;
    left: 9px;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: ${(props) => props.theme.colors.newtralDarker};
    transform: translateY(-50%);
    transition:
      left 0.2s,
      background 0.2s;
  }
  input:checked + &::after {
    left: 31px;
    background: ${(props) => props.theme.colors.borderDark};
  }
  input:disabled + &::after {
    background: ${(props) => props.theme.colors.newtral};
  }
`;

export const ManageNotificationsFooter = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 10px;
  align-items: center;

  border-top: 1px solid #ccc;
  padding-top: 10px;
`;

export const LookingAccountWrap = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
`;

export const PushNotifications = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Automatically = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  justify-content: space-between;

  padding: 8px 12px;
  border-radius: ${(props) => props.theme.radius?.normalRadius};
  border: 1px solid ${(props) => props.theme.colors.newtral};
`;

export const NotificationsLabel = styled.div`
  display: flex;
  gap: 14px;

  .ant-spin-dot-holder {
    color: ${(props) => props.theme.colors?.successDark};
  }

  p {
    font-size: 20px;
  }
`;

export const InformationBlock = styled.div`
  padding: 12px 12px 0;
  margin-top: 10px;
  border: 1px solid ${(props) => props.theme.colors.newtral};
  border-radius: ${(props) => props.theme.radius?.normalRadius};

  .ant-form-item {
    margin-bottom: 0px;
  }
`;

export const HeaderBlock = styled.div`
  padding: 8px;

  border-bottom: 1px solid ${(props) => props.theme.colors.newtral};
`;

export const BodyBlock = styled.div`
  padding: 8px;
`;

export const ImageUpload = styled.div<{ $isLoading?: boolean }>`
  position: relative;
  width: fit-content;

  ${({ $isLoading }) =>
        $isLoading &&
        css`
      .ant-image-img {
        opacity: 0.5;
        pointer-events: none;
      }
    `};
`;

export const Column = styled(Col) <{ $isEnableTwoFactor?: boolean }>`
  button {
    width: fit-content;

    ${({ $isEnableTwoFactor }) =>
        $isEnableTwoFactor &&
        css`
        border-color: ${(props) => props.theme.colors.errorDark};

        span {
          color: ${(props) => props.theme.colors.errorDark};
        }
      `}
  }

  p {
    height: 100%;

    display: flex;
    align-items: center;
  }

  img {
    border-radius: 100px;
    object-fit: cover;
  }

  .ant-spin {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    opacity: 1;
    z-index: 2;

    svg {
      color: ${(props) => props.theme.colors?.successDark};
    }
  }

  p {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    opacity: 1;
    z-index: 2;
  }

  @media ${(props) => props?.theme?.breakpoints?.smMax} {
    display: flex;
    align-items: center;
    justify-content: center;

    button {
      width: 100%;
    }
  }
`;
