import { Flex, FormInstance } from "antd";
import { parsePhoneNumber } from "react-phone-number-input";

import themeColors from "@/styles/themes/default/colors";

import Typography from "../Typography";

import * as S from "./phone-number";

export default function PhoneNumberByCountry({
  currentInstanceForm,
  nameField,
  nameFormList,
  index,
  disabled,
  label,
  isRequired,
  placeholder = "Phone",
  colorLabel = themeColors?.primary,
  isParsePhoneNumber = false,
}: {
  currentInstanceForm: FormInstance;
  nameField?: string;
  nameFormList?: string;
  index?: number | undefined;
  disabled?: boolean;
  label?: string;
  isRequired?: boolean;
  placeholder?: string;
  colorLabel?: string;
  isParsePhoneNumber?: boolean;
}) {
  const renderValue = () => {
    if (index !== undefined) {
      return (
        currentInstanceForm?.getFieldValue(nameFormList)?.[index]?.[
          nameField || ""
        ] || ""
      );
    } else if (isParsePhoneNumber) {
      return currentInstanceForm?.getFieldValue(nameField)?.number || "";
    } else {
      return currentInstanceForm?.getFieldValue(nameField) || "";
    }
  };

  const handleOnchange = (value: string) => {
    const getValuePhoneNumber = parsePhoneNumber(value || "");
    if (index !== undefined) {
      const phoneNumbers = currentInstanceForm
        ?.getFieldValue(nameFormList)
        ?.map((item: any, idx: number) => {
          if (idx === index) {
            return {
              ...item,
              [nameField as string]: value,
              ...(isParsePhoneNumber && {
                country: getValuePhoneNumber?.country,
              }),
            };
          }
          return item;
        });

      currentInstanceForm?.setFieldValue(nameFormList, phoneNumbers);
    } else if (isParsePhoneNumber) {
      if (getValuePhoneNumber) {
        currentInstanceForm?.setFieldValue(nameField, {
          number: getValuePhoneNumber?.number,
          country: getValuePhoneNumber?.country,
        });
      }
    } else {
      currentInstanceForm?.setFieldValue(nameField, value);
    }
  };

  return (
    <Flex vertical>
      {label && (
        <Typography
          padding="0 0 8px 0"
          variant="caption-small"
          color={colorLabel}
        >
          {label} {isRequired && <span style={{ color: "red" }}>*</span>}
        </Typography>
      )}
      <S.PhoneNumberWrapper
        limitMaxLength={true}
        defaultCountry="US"
        disabled={disabled}
        // value={renderValue()}
        onChange={handleOnchange}
        placeholder={placeholder}
      />
    </Flex>
  );
}
