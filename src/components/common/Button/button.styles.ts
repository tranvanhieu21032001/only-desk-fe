import { styled, css } from "styled-components";

export const ButtonCommon = styled.button`
  cursor: pointer;
  padding: 12px 32px;
  border: none;
  border-radius: 8px;
  width: 100%;

  font-weight: ${({ theme }) => theme.fontWeight.semiBold};
  font-size: ${({ theme }) => theme.fontSize.md};
  line-height: 24px;
  text-align: center;
`;

export const PrimaryButton = styled(ButtonCommon)<{
  $bg?: string;
  $isCancel?: boolean;
  $width?: string;
}>`
  background-color: ${(props) => props.$bg || props.theme.colors.secondaryDark};
  color: ${(props) => props.theme.colors.newtralLightest};
  transition: all 0.5s;
  width: ${(props) => props?.$width || "100%"};
  font-size: ${(props) => props.theme.fontSize.base};
  font-weight: ${(props) => props.theme.fontWeight.semiBold};

  ${({ $isCancel }) =>
    $isCancel &&
    css`
      background-color: ${(props) => props.theme.colors.newtralLight};
    `}

  &:not(:disabled):hover {
    background-color: ${(props) => props.$bg || props.theme.colors.primaryDark};
    box-shadow: 0px 11px 27px 0px #00000040;
    transition: all 0.5s;
  }

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }

  &:active {
    background-color: ${(props) =>
      props.$bg || props.theme.colors.primaryDark} !important;
  }
`;

export const DefaultButton = styled(ButtonCommon)<{
  $isCancel?: boolean;
  $width?: string;
}>`
  border: 1px solid ${(props) => props.theme.colors.secondaryDark};
  background-color: ${(props) => props.theme.colors.newtralLightest};
  color: ${(props) => props.theme.colors.secondaryDark};
  width: ${(props) => props?.$width || "100%"};
  font-size: ${(props) => props.theme.fontSize.base};
  font-weight: ${(props) => props.theme.fontWeight.semiBold};

  ${({ $isCancel }) =>
    $isCancel &&
    css`
      border: 1px solid ${(props) => props.theme.colors.newtralLight};
      color: ${(props) => props.theme.colors.newtralLight};
    `}

  &:not(:disabled):hover {
    box-shadow: 0px 11px 27px 0px #00000040;
    transition: all 0.5s;
  }

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }

  &:active {
    background-color: ${(props) =>
      props.theme.colors.primaryLighter} !important;
  }
`;
