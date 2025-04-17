import styled from "styled-components";
import { Checkbox as CheckboxAntd, CheckboxProps } from "antd";

export const Checkbox = styled(CheckboxAntd)``;

export const CheckboxGroup = styled(CheckboxAntd.Group)<CheckboxProps>`
  .ant-checkbox-disabled + span {
    color: ${(props) => props?.theme?.colors?.newtralDarker} !important;
  }
`;

export const WrapCheckbox = styled.div`
  .ant-checkbox-inner {
    border-color: ${(props) => props?.theme?.colors?.newtralDarker};
  }
`;

export const Typo = styled.p`
  font-weight: ${(props) => props?.theme?.fontWeight?.regular};
  font-size: ${(props) => props?.theme?.fontSize?.md};
  line-height: 24px;
  color: ${(props) => props?.theme?.colors?.newtralDarker};
`;

export const Label = styled.div`
  font-weight: ${(props) => props?.theme?.fontWeight?.medium};
  font-size: ${(props) => props?.theme?.fontSize?.md};
  line-height: 24px;
  color: ${(props) => props?.theme?.colors?.newtralDarker};
  margin-bottom: 4px;
`;
