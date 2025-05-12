import { styled, css } from 'styled-components';

export const ButtonCommon = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;

  cursor: pointer;
  padding: 12px 20px;
  border: none;
  border-radius: 8px;
  width: 100%;
  height: 45px;

  font-weight: ${({ theme }) => theme.fontWeight.semiBold};
  font-size: ${({ theme }) => theme.fontSize.md};
  line-height: 24px;
  text-align: center;
  white-space: nowrap;

  svg,
  img {
    width: 20px;
    height: 20px;
    flex-shrink: 0;
    display: block;
  }
`;

export const ButtonContent = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 8px;

  span {
    display: flex;
    align-items: center;
    line-height: 0;
    text-transform: capitalize;
  }
`;

export const PrimaryButton = styled(ButtonCommon)<{
  $bg?: string;
  $isCancel?: boolean;
  $width?: string;
}>`
  background:
    linear-gradient(0deg, #3750b2, #3750b2),
    linear-gradient(0deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)),
    linear-gradient(0deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2));

  color: ${(props) => props.theme.colors.newtralLightest};
  transition: all 0.5s;
  width: ${(props) => props?.$width || '100%'};
  font-size: ${(props) => props.theme.fontSize.base};
  font-weight: ${(props) => props.theme.fontWeight.semiBold};
  box-shadow: 0px 4px 4px 0px #1b1c1d12;

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
  border: 1px solid ${(props) => props.theme.colors.newtral};
  background-color: ${(props) => props.theme.colors.newtralLightest};
  color: ${(props) => props.theme.colors.newtralDark};
  width: ${(props) => props?.$width || '100%'};
  font-size: ${(props) => props.theme.fontSize.base};
  font-weight: ${(props) => props.theme.fontWeight.semiBold};
  box-shadow: 0px 2px 3px rgba(10, 13, 20, 0.05);

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
