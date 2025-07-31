import { useState } from 'react';
import { Image, InputProps as InputPropsFromAntd } from 'antd';
import { EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons';

import themeColors from '@/shared/styles/themes/default/colors';

import Typography from '../Typography';

import * as S from './input.styles';

import icSearch from '@/assets/icons/common/ic-search.svg';
import { ReactSVG } from 'react-svg';
import { isString } from 'lodash';
interface InputProps extends InputPropsFromAntd {
  label?: string;
  isRequired?: boolean;
  colorLabel?: string;
  isFormatNumberCurrency?: boolean;
  isPassword?: boolean;
  prefix?: boolean | string;
  suffix?: string;
  isHeight?: string;
  placeholder?: string;
  domainText?: string;
  isDomainHidden?: boolean;
}

export default function Input({
  label,
  isRequired = false,
  colorLabel = themeColors.primary,
  isPassword = false,
  prefix,
  suffix,
  isHeight,
  placeholder,
   domainText,
  isDomainHidden,
  ...rest
}: InputProps) {
  const [isShowPassWord, setIsShowPassWord] = useState<boolean>(true);

  function handleShowPassWord() {
    setIsShowPassWord((prev) => !prev);
  }

  return (
    <S.WrapInput>
      {label && (
        <Typography padding="0 0 8px 0" color={colorLabel}>
          {label} {isRequired && <span style={{ color: 'red' }}>*</span>}
        </Typography>
      )}

      {isPassword ? (
        <S.Input
          {...rest}
          prefix={
            prefix && (
              <Image
                preview={false}
                src={isString(prefix) ? prefix : icSearch}
              />
            )
          }
          type={isShowPassWord ? 'password' : 'text'}
          suffix={
            isShowPassWord ? (
              <EyeInvisibleOutlined onClick={handleShowPassWord} />
            ) : (
              <EyeOutlined onClick={handleShowPassWord} />
            )
          }
          $isHeight={isHeight}
          placeholder={placeholder}
        />
      ) : (
        <S.Input
          {...rest}
          prefix={
            prefix && (
              <Image
                preview={false}
                src={isString(prefix) ? prefix : icSearch}
              />
            )
          }
          $isHeight={isHeight}
          suffix={suffix && <ReactSVG src={suffix} />}
          placeholder={placeholder}
        />
      )}
      {domainText && <S.Domain $hidden={isDomainHidden}>{domainText}</S.Domain>}
    </S.WrapInput>
  );
}
