import { styled } from 'styled-components';

import { Input as InputAntd } from 'antd';

export const WrapInput = styled.div``;

export const Input = styled(InputAntd)`
  width: 100%;
  height: 47px;
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
