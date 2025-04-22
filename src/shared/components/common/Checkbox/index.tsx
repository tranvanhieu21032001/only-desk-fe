import { CheckboxOptionType, CheckboxProps } from "antd";

import themeColors from "@/shared/styles/themes/default/colors";

import Typography from "../Typography";

import * as S from "./checkbox.styles";

interface CheckboxPropsInterface extends CheckboxProps {
  isGroup?: boolean;
  options?: CheckboxOptionType[];
  contentField?: string;
  defaultValue?: string[];
  defaultChecked?: boolean;
  label?: string;
  isRequired?: boolean;
  colorLabel?: string;
}

export default function Checkbox({
  isGroup,
  options,
  contentField,
  defaultValue,
  defaultChecked,
  label,
  isRequired = false,
  colorLabel = themeColors.newtral,
  ...rest
}: CheckboxPropsInterface) {
  if (isGroup) {
    return (
      <>
        {label && (
          <Typography
            padding="0 0 8px 0"
            variant="caption-small"
            color={colorLabel}
          >
            {label} {isRequired && <span style={{ color: "red" }}>*</span>}
          </Typography>
        )}
        <S.CheckboxGroup
          options={options || []}
          defaultValue={defaultValue}
          {...rest}
        />
      </>
    );
  }

  return (
    <>
      {label && (
        <Typography
          padding="0 0 8px 0"
          variant="caption-small"
          color={colorLabel}
        >
          {label} {isRequired && <span style={{ color: "red" }}>*</span>}
        </Typography>
      )}
      <S.Checkbox defaultChecked={defaultChecked} {...rest}>
        <S.Typo>{contentField}</S.Typo>
      </S.Checkbox>
    </>
  );
}
