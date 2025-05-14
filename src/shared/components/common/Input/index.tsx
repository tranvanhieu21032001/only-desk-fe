import { useState } from 'react';
import { Image, InputProps as InputPropsFromAntd } from 'antd';
import { EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons';

import themeColors from '@/shared/styles/themes/default/colors';

import Typography from '../Typography';

import * as S from './input.styles';

import icSearch from '@/assets/icons/common/ic-search.svg';
import { ReactSVG } from 'react-svg';
interface InputProps extends InputPropsFromAntd {
  label?: string;
  isRequired?: boolean;
  colorLabel?: string;
  isFormatNumberCurrency?: boolean;
  isPassword?: boolean;
  prefix?: boolean | string;
  suffix?: string;
}

export default function Input({
  label,
  isRequired = false,
  colorLabel = themeColors.primary,
  isPassword = false,
  prefix,
  suffix,
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
              <Image preview={false} src={(prefix as string) || icSearch} />
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
        />
      ) : (
        <S.Input
          {...rest}
          prefix={
            prefix && (
              <Image preview={false} src={(prefix as string) || icSearch} />
            )
          }
          suffix={suffix && <ReactSVG src={suffix} />}
        />
      )}
    </S.WrapInput>
  );
}
