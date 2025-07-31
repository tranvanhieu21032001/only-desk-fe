import { styled } from 'styled-components';

import { Input as InputAntd } from 'antd';

export const WrapInput = styled.div`
  position: relative;
`;

export const Input = styled(InputAntd)<{ $isHeight?: string }>`
  width: 100%;
  height: ${({ $isHeight }) => $isHeight || '47px'};
  box-shadow: none !important;
  border-color: none !important;

  border-radius: 8px;
  border: 1px solid ${(props) => props.theme.colors.newtral};

  font-weight: ${({ theme }) => theme.fontWeight.regular};
  font-size: ${({ theme }) => theme.fontSize.base};
  line-height: 24px;
  color: ${(props) => props.theme.colors.primary};

  &.ant-input-affix-wrapper-focused {
    border: 1px solid ${(props) => props.theme.colors.secondaryDark} !important;
  }

  &.ant-input-affix-wrapper {
    .ant-input {
      font-weight: ${({ theme }) => theme.fontWeight.regular};
      font-size: ${({ theme }) => theme.fontSize.base};
      line-height: 24px;
      color: ${(props) => props.theme.colors.primary};

      &::placeholder {
        font-weight: ${({ theme }) => theme.fontWeight.regular};
        font-size: ${({ theme }) => theme.fontSize.base};
        line-height: 24px;
        color: ${(props) => props.theme.colors.newtralDarker};
      }

      &:disabled {
        opacity: 1.3 !important;

        font-weight: ${({ theme }) => theme.fontWeight.regular};
        font-size: ${({ theme }) => theme.fontSize.base};
        line-height: 24px;
        color: ${(props) => props.theme.colors.newtralLight};
      }
    }
  }

  &:not(:disabled):hover {
    border: 1px solid ${(props) => props.theme.colors.secondaryDark} !important;
  }

  &:focus {
    border: 1px solid ${(props) => props.theme.colors.secondaryDark} !important;
  }

  &:disabled {
    opacity: 1.3 !important;

    font-weight: ${({ theme }) => theme.fontWeight.regular};
    font-size: ${({ theme }) => theme.fontSize.base};
    line-height: 24px;
    color: ${(props) => props.theme.colors.newtralDark};
  }

  &::placeholder {
    font-weight: ${({ theme }) => theme.fontWeight.regular};
    font-size: ${({ theme }) => theme.fontSize.base};
    line-height: 24px;
    color: ${(props) => props.theme.colors.newtralLight};
  }
`;

export const Domain = styled.div<{ $hidden?: boolean }>`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: 12px;
  font-size: 12px;
  padding: 8px 10px;
  color: #253a8e;
  border-radius: 8px;
  background-color: #edf1f8;
  visibility: ${({ $hidden }) => ($hidden ? 'hidden' : 'visible')};
`;
