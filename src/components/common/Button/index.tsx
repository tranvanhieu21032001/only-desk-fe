import React from 'react';
import { LoadingOutlined } from '@ant-design/icons';

import * as S from './button.styles';

interface ButtonProps {
  type?: 'default' | 'primary';
  backgroundColor?: string;
  children: React.ReactNode;
  disabled?: boolean;
  isCancel?: boolean;
  isLoading?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  width?: string;
  htmlType?: 'button' | 'submit' | 'reset';
}

export default function Button({
  type = 'default',
  backgroundColor,
  children,
  disabled = false,
  isCancel = false,
  isLoading = false,
  onClick = () => {},
  width = '100%',
  htmlType = 'button',
  ...rest
}: ButtonProps) {
  switch (type) {
    case 'primary':
      return (
        <S.PrimaryButton
          onClick={onClick}
          $bg={backgroundColor}
          $isCancel={isCancel}
          disabled={disabled || isLoading}
          $width={width}
          type={htmlType}
          {...rest}
        >
          {children} {isLoading && <LoadingOutlined />}
        </S.PrimaryButton>
      );
    default:
      return (
        <S.DefaultButton
          onClick={onClick}
          disabled={disabled || isLoading}
          $isCancel={isCancel}
          $width={width}
          type={htmlType}
          {...rest}
        >
          {children} {isLoading && <LoadingOutlined />}
        </S.DefaultButton>
      );
  }
}
