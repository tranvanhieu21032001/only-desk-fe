// import { InputProps as InputPropsFromAntd } from 'antd';

import themeColors from '@/shared/styles/themes/default/colors';

import Typography from '../Typography';
import * as S from './input.styles';

// interface InputProps extends InputPropsFromAntd {
//   label?: string;
//   isRequired?: boolean;
//   colorLabel?: string;
// }

export default function TextArea({
  label,
  isRequired = false,
  colorLabel = themeColors.newtral,
  isCustomize = false,
  ...rest
}: any) {
  return (
    <S.WrapInput $isCustomize={isCustomize}>
      {label && (
        <Typography
          padding="0 0 8px 0"
          variant="caption-small"
          color={colorLabel}
        >
          {label} {isRequired && <span style={{ color: 'red' }}>*</span>}
        </Typography>
      )}
      <S.Input autoSize={{ minRows: 4, maxRows: 6 }} {...rest} />
    </S.WrapInput>
  );
}
