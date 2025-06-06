import Select from "@/shared/components/common/Select";
import fontWeight from "@/shared/styles/themes/default/fontWeight";
import { Option } from "antd/es/mentions";
import styled from "styled-components";

export const BillingDetails = styled.div`
padding:24px 0;
hr{
    border: 1px solid ${(props) => props.theme.colors.newtral};
}

`

export const Section = styled.section`
border: 1px solid ${(props) => props.theme.colors.newtral};
gap: 8px;
padding: 12px;
border-radius: 8px;
margin-bottom:12px;

`


export const FormField = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  margin-top:24px;
  gap: 4px;
  label {
    font-weight: ${fontWeight.semiBold};
  }

  input {
    font-size: ${(props) => props.theme.fontSize.base};
    height: 47px;
    padding: 12px;
    border-radius:8px;
    border-top: 1px solid ${(props) => props.theme.colors.newtral};
  }
`;

export const GroupField = styled.div`
  display: flex;
  gap: 16px;
`;


export const FormInput = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`


export const ChangeCountry = styled(Select)`
  width: 100%;

  margin-bottom: 12px;

  .ant-select-selection-item {
    display: flex !important;

    align-items: center;
    gap: 8px;
  }

  @media ${(props) => props?.theme?.breakpoints?.lgMax} {
    margin-bottom: 0%;
  }
`;

export const CountryOption = styled(Option)`
  display: flex;
  align-items: center;
  gap: 4px;
`;

export const Title = styled.h3`
  font-size: ${(props) => props.theme.fontSize.lg};
  color: ${(props) => props.theme.colors.primaryDark};
  padding:12px 0;
`