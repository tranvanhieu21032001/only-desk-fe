import { Option } from "antd/es/mentions";
import { css, styled } from "styled-components";

import Select from "@/shared/components/common/Select";
import Typography from "@/shared/components/common/Typography";

export const ChildrenWrap = styled.div``;

export const WrapAuthLayout = styled.section`
  height: fit-content;
  min-height: 100vh;

  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Inprogress = styled.div`
  margin: 48px 0;

  display: flex;
  gap: 8px;
  align-items: center;
  justify-content: space-between;

  @media ${(props) => props?.theme?.breakpoints?.lgMax} {
    margin: 24px 0;
  }

  @media ${(props) => props?.theme?.breakpoints?.mdMax} {
    margin: 16px 0;
  }
`;

export const Back = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;

  cursor: pointer;
`;

export const LineProgressWrap = styled.div`
  gap: 4px;
  display: flex;
  align-items: center;
`;

export const Line = styled.div<{ $color?: string }>`
  width: 16px;
  border: 2px solid ${(props) => props?.theme?.colors?.newtralLight};
  opacity: 0.5;
  border-radius: 4px;

  ${({ $color }) => {
    switch ($color) {
      case "old":
        return css`
          border-color: #687cca;
          opacity: 1;
        `;
      case "current":
        return css`
          border-color: #3750b2;
          opacity: 1;
          width: 24px;
        `;

      default:
        break;
    }
  }}
`;

export const AuthLayout = styled.div`
  height: fit-content;
  min-height: 100vh;
  width: 100%;
`;

export const HeaderWrap = styled.div`
  height: 36px;

  display: flex;
  align-items: center;
  justify-content: space-between;

  @media ${(props) => props?.theme?.breakpoints?.lgMax} {
    top: 24px;
  }
`;

export const Logo = styled.img``;

export const MultipleLangWrap = styled.div`
  height: 100%;
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
    min-height: 36px;

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
