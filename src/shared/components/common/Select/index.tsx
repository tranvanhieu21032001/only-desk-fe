import { SelectProps as SelectPropsFromAntd } from "antd";

import themeColors from "@/shared/styles/themes/default/colors";
import { DefaultOptionType } from "antd/es/select";

import Typography from "../Typography";

import * as S from "./select.styles";

interface SelectProps extends SelectPropsFromAntd {
  label?: string;
  prefixIcon?: React.ReactNode;
  isRequired?: boolean;
  colorLabel?: string;
  isResponsiveTag?: boolean;
}

export default function Select({
  label,
  prefixIcon,
  isRequired = false,
  colorLabel = themeColors.newtral,
  isResponsiveTag = false,
  ...rest
}: SelectProps) {
  const filterOption = (input: string, option?: DefaultOptionType): boolean =>
    (option?.label as string)?.toLowerCase().includes(input.toLowerCase());

  return (
    <S.WrapSelect>
      {label && (
        <Typography
          padding="0 0 8px 0"
          variant="caption-small"
          color={colorLabel}
        >
          {label} {isRequired && <span style={{ color: "red" }}>*</span>}
        </Typography>
      )}
      {prefixIcon && <S.PrefixIcon>{prefixIcon}</S.PrefixIcon>}
      <S.Select
        $isPrefixIcon={prefixIcon ? true : false}
        $isResponsiveTag={isResponsiveTag}
        filterOption={(input, option) =>
          filterOption(input, option as { label?: string; value?: string })
        }
        maxTagCount={isResponsiveTag ? undefined : "responsive"}
        {...rest}
      />
    </S.WrapSelect>
  );
}
