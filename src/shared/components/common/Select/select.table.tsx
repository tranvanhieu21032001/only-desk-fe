import { useCallback, useEffect, useState } from "react";
import { DefaultOptionType } from "antd/es/select";
import { SelectProps } from "antd";
import Typography from "../Typography";

import { getRequest } from "@/core/services/requests";
import themeColors from "@/shared/styles/themes/default/colors";

import * as S from "./select.styles";

export interface SelectPropsInterface extends SelectProps {
  label?: string;
  prefixIcon?: React.ReactNode;
  isRequired?: boolean;
  colorLabel?: string;
  api?: {
    endpoint: string;
    keyLabel: string;
    keyValue: string;
    convertResponse?: (value: any) => any;
    params?: {
      nameFieldGetValue?: string;
      nameFieldParam?: string;
      populate?: string;
      limit?: number;
    };
  };
}

function Select({
  api,
  options,
  label,
  prefixIcon,
  isRequired = false,
  colorLabel = themeColors.newtral,
  ...rest
}: SelectPropsInterface) {
  const [dataOptions, setDataOptions] = useState<DefaultOptionType[]>(
    options || []
  );

  const [loading, setLoading] = useState<boolean>(false);
  const getOptionsValue = useCallback(async () => {
    try {
      if (!api) {
        throw new Error("Missing api");
      }
      setLoading(true);

      const response: any = await getRequest(api?.endpoint, {
        params: api?.params,
      });

      const rawData = api?.convertResponse
        ? api?.convertResponse(response)
        : response?.data?.docs || [];

      const convertRawDataToOptions = rawData?.map((item: any) => ({
        label: item?.[api.keyLabel] || null,
        value: item?.[api.keyValue] || null,
      }));

      setDataOptions(convertRawDataToOptions);
    } catch (error: any) {
      setDataOptions(options || []);
    } finally {
      setLoading(false);
    }
  }, [api, options]);

  useEffect(() => {
    getOptionsValue();
  }, [getOptionsValue]);

  const filterOption = (
    input: string,
    option?: { label?: string; value?: string }
  ) => {
    const label = typeof option?.label === "string" ? option.label : "";
    return label.toLowerCase().includes(input.toLowerCase());
  };

  if (loading) {
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
          options={dataOptions}
          $isPrefixIcon={prefixIcon ? true : false}
          maxTagCount="responsive"
          value={null}
          placeholder={rest.placeholder || "loading..."}
          loading
          filterOption={(input, option) =>
            filterOption(input, option as { label?: string; value?: string })
          }
        />
      </S.WrapSelect>
    );
  }

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
        options={dataOptions}
        $isPrefixIcon={prefixIcon ? true : false}
        maxTagCount="responsive"
        loading={loading}
        filterOption={(input, option) =>
          filterOption(input, option as { label?: string; value?: string })
        }
        {...rest}
      />
    </S.WrapSelect>
  );
}

export default Select;
