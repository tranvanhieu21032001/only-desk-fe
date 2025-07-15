import { Form } from 'antd';
import styled, { css } from 'styled-components';

export const AccountInformationContainer = styled.section`
  height: calc(100vh - 80px);
  overflow-y: scroll;
  background-color: #fff;

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

export const Box = styled.div`
  background: #fff;
  border-radius: 8px;
  border: 1px solid #e5e7eb;
  margin-bottom: 16px;
  padding: 16px;
  margin-top: 12px;
`;

export const BoxTitle = styled.h3`
  color: #233876;
  font-weight: 700;
  margin: 0;
`;

export const BoxSubTitle = styled.h4`
  color: #233876;
  padding-bottom: 10px;
  font-weight: 600;
  margin: 0;
`;

export const BoxRowOptions = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const OperatorBoxRow = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`;

export const OperatorBoxIcon = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;

  img,
  svg {
    cursor: pointer;
  }
`;

export const OperatorIcon = styled.div`
  img,
  svg {
    cursor: pointer;
  }
`;

export const BoxRow = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`;

export const BoxColBetween = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`;

export const BoxCol = styled.div`
  display: flex;
  padding-top: 10px;
  flex-direction: column;
  gap: 16px;
  border-top: 1px solid #ccc;
`;

export const FlexRowBetween = styled.div`
  display: flex;
  padding-bottom: 17px;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #ccc;
`;
export const OperatorRow = styled.div<{ $hasBorder: boolean }>`
  display: grid;
  grid-template-columns: 48px 2fr 1fr 2fr 0.5fr;
  align-items: center;
  column-gap: 8px;
  padding: 12px 0;
  border-bottom: ${({ $hasBorder }) =>
    $hasBorder ? '1px solid #f0f0f0' : 'none'};

  @media (max-width: 768px) {
    grid-template-columns: 36px 0.7fr 1fr 1fr 0.5fr;
  }
`;

export const OperatorAvatar = styled.img`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  object-fit: cover;
`;

export const OperatorName = styled.div`
  font-weight: 600;
  padding-bottom: 10px;
  min-width: 150px;
`;

export const OperatorYou = styled.span`
  color: #888;
  font-weight: 400;
`;

export const OperatorRole = styled.span<{ $isOwner?: boolean }>`
  background: ${({ $isOwner }) => ($isOwner ? '#e6f4ff' : '#FCE9F4')};
  color: ${({ $isOwner }) => ($isOwner ? '#1890ff' : '#C41D7F')};
  border-radius: 6px;
  padding: 2px 8px;
  font-size: 12px;
  margin-right: 8px;
`;

export const StatusActive = styled.div`
  background: #fff;
  color: #333;
  width: 90px;
  border-radius: 8px;
  border: 1px solid #ccc;
  padding: 8px;
  font-size: 12px;
  display: flex;
  gap: 5px;
  justify-content: center;
  align-items: center;

  img,
  svg {
    width: 20px;
    height: 20px;
  }
`;

export const StatusInvited = styled.div`
  background: #fff;
  width: 90px;
  color: #333;
  border-radius: 8px;
  border: 1px solid #ccc;
  padding: 8px;
  font-size: 12px;
  display: flex;
  gap: 5px;
  justify-content: center;
  align-items: center;

  img,
  svg {
    width: 20px;
    height: 20px;
  }
`;

export const OperatorEmail = styled.div`
  padding: 0 20px;
`;

export const ActionsWrapper = styled.div`
  display: flex;
  gap: 24px;
  align-items: center;

  img,
  svg {
    cursor: pointer;
  }
`;

export const FooterSaved = styled.div`
  display: flex;
  gap: 5px;
  justify-content: flex-end;
  align-items: center;
  margin-top: 16px;

  img,
  svg {
    width: 20px;
    height: 20px;
  }
`;

export const FooterSavedCheck = styled.div`
  display: flex;
  padding: 10px;
  gap: 5px;
  justify-content: flex-end;
  border: 1px solid #ccc;
  border-radius: 8px;
  align-items: center;
  margin-top: 16px;

  img,
  svg {
    width: 20px;
    height: 20px;
  }
`;

export const ModalEmpty = styled.div`
  display: flex;
  gap: 10px;
  justify-content: flex-start;
`;

export const ModalEmptyColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;

  p {
    font-size: 14px;
    line-height: 23px;
    font-weight: 600;
  }

  span {
    font-size: 12px;
    line-height: 20px;
    font-weight: 400;
  }
`;

export const ModalEmptyFooter = styled.div`
  display: flex;
  gap: 12px;
  justify-content: flex-end;
`;

export const ModalAddOperatorSelect = styled.div`
  display: flex;
  gap: 20px;
  flex-direction: column;
`;

export const ModalAddOperatorWrapper = styled.div`
  display: flex;
  gap: 5px;
  flex-direction: column;
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

export const AuthBox = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  padding: 20px 24px;
  background: #fff;
  cursor: pointer;
  transition:
    border-color 0.2s,
    background 0.2s;
  &:hover {
    border-color: #3750b2;
    background: #f5f7fa;
  }
`;

export const AuthPassword = styled.div`
  h2 {
    font-size: 14px;
    line-height: 23px;
    font-weight: 600;
  }

  p {
    font-size: 12px;
    line-height: 20px;
    font-weight: 400;
    margin-bottom: 20px;
  }

  span {
    font-size: 14px;
    line-height: 23px;
    font-weight: 400;
  }
`;

export const AuthModalTitle = styled.div`
  font-size: 14px;
  line-height: 23px;
  font-weight: 600;
`;

export const AuthModalDesc = styled.div`
  color: #666;
  font-size: 12px;
  line-height: 20px;
  font-weight: 400;
`;

export const AuthModalGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  margin-bottom: 24px;
`;

export const AuthBoxTitle = styled.div`
  font-size: 14px;
  line-height: 23px;
  font-weight: 600;
`;

export const AuthBoxDesc = styled.div`
  color: #666;
  font-size: 12px;
  line-height: 20px;
  font-weight: 400;
`;

export const SignInWrapper = styled.div`
  width: 100%;
  margin-top: 24px;
`;

export const SignInTitle = styled.div`
  font-size: 14px;
  line-height: 23px;
  font-weight: 600;
`;

export const SignInDesc = styled.div`
  font-size: 12px;
  line-height: 20px;
  font-weight: 400;
  margin-bottom: 20px;
`;

export const SignInButton = styled.button`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 12px;
  border: 1px solid #e5e6eb;
  border-radius: 12px;
  background: #fff;
  padding: 14px;
  font-weight: 600;
  font-size: 16px;
  color: #222;
  cursor: pointer;
  justify-content: center;
`;

export const TwoFAWrapper = styled.div`
  width: 100%;
  margin-top: 24px;
`;

export const TwoFATitle = styled.div`
  font-size: 14px;
  line-height: 23px;
  font-weight: 600;
`;

export const TwoFADesc = styled.div`
  font-size: 12px;
  line-height: 20px;
  font-weight: 400;
  margin-bottom: 20px;
`;

export const TwoFAInputGroup = styled.div`
  display: flex;
  gap: 24px;
  justify-content: center;
`;

export const TwoFAInputBox = styled.input`
  width: 72px;
  height: 72px;
  border-radius: 12px;
  border: 1.5px solid #e5e7eb;
  background: #fff;
  font-size: 32px;
  font-weight: 600;
  color: #222;
  text-align: center;
  outline: none;
  transition: border 0.2s;
  box-shadow: none;
  &:focus {
    border: 1.5px solid #3750b2;
  }
`;

export const PasswordInput = styled.input`
  width: 100%;
  background: transparent;
  border: none;
  outline: none;
  font-size: 16px;
  flex: 1;

  &::placeholder {
    font-size: 14px;
    color: #bfbfbf;
  }
`;

export const FlexBetween = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const PasswordInputWrapper = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid #e5e6eb;
  border-radius: 8px;
  padding: 8px;
  gap: 8px;
`;

export const RequiredAsterisk = styled.span`
  color: red;
`;

export const FormItem = styled(Form.Item)<{
  $margin?: string;
  $isRememberMe?: boolean;
}>`
  ${({ $margin }) =>
    $margin &&
    css`
      margin: ${$margin} !important;
    `}

  ${({ $isRememberMe }) =>
    $isRememberMe &&
    css`
      margin: 0 !important;

      .ant-form-item-control-input-content {
        display: flex;
        align-items: center;
        gap: 8px;

        .ant-checkbox-label {
          display: none;
        }
      }
    `}
`;

export const FormWrap = styled(Form)`
  display: flex;
  flex-direction: column;
  .ant-row {
    display: unset !important;
  }
    .ant-form-item .ant-form-item-label >label{
    float:left;
    display: flex;
    flex-direction: row-reverse;
    }

  && .ant-form-item-label > label::after {
    content: none !important;
    display: none !important;
  }
}
`;
