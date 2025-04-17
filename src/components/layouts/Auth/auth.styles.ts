import { Option } from "antd/es/mentions";
import { styled } from "styled-components";

import Select from "@/components/common/Select";
import Typography from "@/components/common/Typography";

export const ChildrenWrap = styled.div``;

export const WrapAuthLayout = styled.section`
  height: fit-content;
  min-height: 100vh;

  display: flex;
  justify-content: center;
  align-items: center;
`;

export const AuthLayout = styled.section`
  height: fit-content;
  min-height: 100vh;
  width: 100%;
`;

export const HeaderWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const Logo = styled.img``;

export const MultipleLangWrap = styled.div`
  display: flex;
  align-items: center;

  p {
    cursor: pointer;
  }
`;

export const NeedHelp = styled(Typography)``;

export const Divider = styled.div`
  width: 0.5px;
  height: 24px;
  background-color: ${(props) => props?.theme?.colors?.newtralDarker};
  margin: 0 12px;
`;

export const ChangeLang = styled(Select)`
  min-width: 125px;
  width: fit-content;

  .ant-select-selector {
    border: none !important;
    padding: 0px !important;

    .ant-select-selection-search-input {
    }

    .ant-select-selection-item {
      justify-content: flex-start !important;
    }

    .ant-select-selection-item {
      display: flex !important;

      align-items: center;
      justify-content: center;
      gap: 8px;
    }
  }

  .ant-select-arrow {
    margin-top: -3px;
  }
`;

export const LangOption = styled(Option)`
  display: flex;
  align-items: center;
  gap: 4px;
`;
