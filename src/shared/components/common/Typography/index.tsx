import React from 'react';

import * as S from './typography.styles';

interface TypographyProps {
  variant?:
    | 'h1'
    | 'h2'
    | 'h3'
    | 'h4'
    | 'h5'
    | 'h6'
    | 'body-text-larger'
    | 'body-text-normal'
    | 'body-text-small'
    | 'caption-normal'
    | 'caption-small';
  color?: string;
  children: React.ReactNode;
  margin?: string;
  padding?: string;
  fontWeight?: number;
  textAlign?: string;
  onClick?: () => void;
}

export default function Typography({
  variant = 'body-text-small',
  color,
  children,
  padding,
  margin,
  fontWeight,
  textAlign,
  onClick,
}: TypographyProps) {
  switch (variant) {
    case 'h1':
      return (
        <S.H1
          $color={color}
          $margin={margin}
          $padding={padding}
          $fontWeight={fontWeight}
          $textAlign={textAlign}
          onClick={onClick}
        >
          {children}
        </S.H1>
      );
    case 'h2':
      return (
        <S.H2
          $color={color}
          $margin={margin}
          $padding={padding}
          $fontWeight={fontWeight}
          $textAlign={textAlign}
          onClick={onClick}
        >
          {children}
        </S.H2>
      );
    case 'h3':
      return (
        <S.H3
          $color={color}
          $margin={margin}
          $padding={padding}
          $fontWeight={fontWeight}
          $textAlign={textAlign}
          onClick={onClick}
        >
          {children}
        </S.H3>
      );
    case 'h4':
      return (
        <S.H4
          $color={color}
          $margin={margin}
          $padding={padding}
          $fontWeight={fontWeight}
          $textAlign={textAlign}
          onClick={onClick}
        >
          {children}
        </S.H4>
      );
    case 'h5':
      return (
        <S.H5
          $color={color}
          $margin={margin}
          $padding={padding}
          $fontWeight={fontWeight}
          $textAlign={textAlign}
          onClick={onClick}
        >
          {children}
        </S.H5>
      );
    case 'body-text-larger':
      return (
        <S.P
          className="body-text-larger"
          $color={color}
          $margin={margin}
          $padding={padding}
          $fontWeight={fontWeight}
          $textAlign={textAlign}
          onClick={onClick}
        >
          {children}
        </S.P>
      );
    case 'body-text-normal':
      return (
        <S.P
          className="body-text-normal"
          $color={color}
          $margin={margin}
          $padding={padding}
          $fontWeight={fontWeight}
          $textAlign={textAlign}
          onClick={onClick}
        >
          {children}
        </S.P>
      );
    case 'body-text-small':
      return (
        <S.P
          className="body-text-small"
          $color={color}
          $margin={margin}
          $padding={padding}
          $fontWeight={fontWeight}
          $textAlign={textAlign}
          onClick={onClick}
        >
          {children}
        </S.P>
      );
    case 'caption-normal':
      return (
        <S.P
          className="caption-normal"
          $color={color}
          $margin={margin}
          $padding={padding}
          $fontWeight={fontWeight}
          $textAlign={textAlign}
          onClick={onClick}
        >
          {children}
        </S.P>
      );
    case 'caption-small':
      return (
        <S.P
          className="caption-small"
          $color={color}
          $margin={margin}
          $padding={padding}
          $fontWeight={fontWeight}
          $textAlign={textAlign}
          onClick={onClick}
        >
          {children}
        </S.P>
      );
    default:
      return (
        <S.P
          className="body-text-normal"
          $color={color}
          $margin={margin}
          $padding={padding}
          $fontWeight={fontWeight}
          $textAlign={textAlign}
          onClick={onClick}
        >
          {children}
        </S.P>
      );
  }
}
