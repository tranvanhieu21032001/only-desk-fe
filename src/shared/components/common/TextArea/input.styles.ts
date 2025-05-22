import { styled, css } from 'styled-components';

import { Input as InputAntd } from 'antd';

export const WrapInput = styled.div<{
  $isCustomize?: boolean;
}>`
  ${(props) => {
    if (props?.$isCustomize) {
      return css`
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 20px;
        p {
          padding: 0px;
          width: 200px;
          white-space: nowrap;
        }
        @media (max-width: 576.1px) {
          flex-direction: column;
          align-items: flex-start;
          gap: 10px;
        }
      `;
    }
  }}
`;

export const Input = styled(InputAntd.TextArea)`
  width: 100%;
  height: 48px;
  box-shadow: none !important;
  border-color: none !important;

  border-radius: 8px;
  border: 1px solid ${(props) => props.theme.colors.newtral};

  font-weight: ${({ theme }) => theme.fontWeight.regular};
  font-size: ${({ theme }) => theme.fontSize.base};
  line-height: 24px;
  color: ${(props) => props.theme.colors.primary} !important;

  &.ant-input-affix-wrapper-focused {
    border: 1px solid ${(props) => props.theme.colors.primary} !important;
  }

  &.ant-input-affix-wrapper {
    .ant-input {
      font-weight: ${({ theme }) => theme.fontWeight.regular};
      font-size: ${({ theme }) => theme.fontSize.base};
      line-height: 24px;
      color: ${(props) => props.theme.colors.primary} !important;

      &::placeholder {
        font-weight: ${({ theme }) => theme.fontWeight.regular};
        font-size: ${({ theme }) => theme.fontSize.base};
        line-height: 24px;
        color: ${(props) => props.theme.colors.newtralLight};
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
    border: 1px solid ${(props) => props.theme.colors.primary};
  }

  &:focus {
    border: 1px solid ${(props) => props.theme.colors.primary} !important;
  }

  &:disabled {
    opacity: 1.3 !important;

    font-weight: ${({ theme }) => theme.fontWeight.regular};
    font-size: ${({ theme }) => theme.fontSize.base};
    line-height: 24px;
    color: ${(props) => props.theme.colors.newtralLight};
  }

  &::placeholder {
    font-weight: ${({ theme }) => theme.fontWeight.regular};
    font-size: ${({ theme }) => theme.fontSize.base};
    line-height: 24px;
    color: ${(props) => props.theme.colors.newtralLight};
  }
`;
