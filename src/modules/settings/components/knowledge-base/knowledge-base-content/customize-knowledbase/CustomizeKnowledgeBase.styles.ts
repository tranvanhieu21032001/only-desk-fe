import Select from '@/shared/components/common/Select';
import fontWeight from '@/shared/styles/themes/default/fontWeight';
import { Option } from 'antd/es/mentions';
import { styled } from 'styled-components';

export const KnowledgeBaseInformationContainer = styled.section`
  height: calc(100vh - 80px);
   overflow-y: auto;
  &::-webkit-scrollbar {
    width: 4px;
    height: 9px;
  }

  @media ${(props) => props?.theme?.breakpoints?.lgMax} {
    height: calc(100vh - 80px);
  }

  @media ${(props) => props?.theme?.breakpoints?.mdMax} {
    height: calc(100vh - 60px);
  }

  @media ${(props) => props?.theme?.breakpoints?.smMax} {
    height: calc(100vh - 60px);
  }

  @media ${(props) => props?.theme?.breakpoints?.xsMax} {
    height: calc(100vh - 60px);
  }
`;

export const KnowledgeBaseInformation = styled.div`
  padding: 12px;
  background-color: ${(props) => props?.theme?.colors?.newtralLightest};

  .ant-form {
    overflow-y: auto;
  }
    .ant-select {
    margin-bottom:0px;
    }

  @media ${(props) => props?.theme?.breakpoints?.lgMax} {
    height: calc(100% - 10px);
  }
`;

export const KnowledgeBaseInformation2 = styled.div`
  padding: 12px;
  margin: 4px 0;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  background-color: ${(props) => props?.theme?.colors?.newtralLightest};

  .ant-form {
    overflow-y: auto;
  }

  @media ${(props) => props?.theme?.breakpoints?.lgMax} {
    height: calc(100% - 10px);
  }
`;

export const KnowledgeBaseInformationLabel = styled.div`
  display: flex;
  gap: 14px;
  margin-bottom: 12px;
  p {
    font-size: 20px;
  }
`;

export const GroupInput = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
`;

export const FormInput = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  margin-bottom: 8px;
`;

export const FormField = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  width: 100%;
  margin-bottom: 24px;

  ${GroupInput} & {
    width: 50%;
  }

  label {
    font-weight: ${fontWeight.semiBold};
  }

  input {
    background: #e8e8e8 !important;
    border: 1px solid #d9d9d9;
    transition: none;

    &:hover,
    &:focus,
    &:active {
      background: #e8e8e8 !important;
      border-color: #d9d9d9 !important;
      box-shadow: none !important;
    }
  }

  .ant-select-selector {
    padding: 12px;
    background: #e8e8e8 !important;
    border-color: #d9d9d9 !important;

    &:hover,
    &:focus,
    &:active {
      background: #e8e8e8 !important;
      border-color: #d9d9d9 !important;
      box-shadow: none !important;
    }
  }
`;

export const SectionBox = styled.div`
  display: flex;
  flex-direction: column;

  padding: 15px;
  border-radius: 8px;
  border: 1px solid #e8e8e8;
  margin-top: 10px;
`;
export const Tỉtle = styled.div`
  font-size: 18px;
  color: ${({ theme }) => theme.colors.secondaryDarker};
  line-height: 23px;
  font-weight: 600;
  border-bottom: 1px solid #ccc;
  padding-bottom: 10px;
`;

export const WrapSection = styled.div`
  margin-top: 12px;
  padding: 12px;
`;

export const WrapUpload = styled.div`
  display: flex;
  width: fit-content;
  align-items: center;
  padding: 12px;
  border-radius: 8px;
  gap: 8px;
  border: 1px solid #e8e8e8;
`;

export const WrapUpload2 = styled.div`
  margin-top: 12px;
  display: flex;
  align-items: center;
  padding: 12px;
  border-radius: 8px;
  gap: 8px;
  border: 1px solid #e8e8e8;
`;

export const Desc = styled.p`
  font-weight: 400;
  font-style: italic;
  font-size: 12px;
  color: #5b5b5b;
`;

export const WrapContent = styled.div`
  margin: 0 36px;
`;

export const Ordinal = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 26px;
  width: 26px;
  border-radius: 9999px;
  color: #ffffff;
  background-color: #3750b2;
`;

export const Content = styled.div`
  display: flex;
  align-items: center;
`;

export const Detail = styled.div`
  padding: 8px 10px;
  margin: 0 4px;
  color: #253a8e;
  border-radius: 8px;
  background-color: #edf1f8;
`;

export const AutoSaveIndicator = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  background: #fff;
  border: 1px solid ${(props) => props.theme.colors.newtral};
  border-radius: 8px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.04);

  img {
    width: 16px;
    height: 16px;
  }

  p {
    color: #333;
    font-size: 15px;
    font-weight: 500;
    margin: 0;
  }
`;

export const WrapButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 12px;
  button {
    width: fit-content;
  }
`;


export const ChangeLang = styled(Select)`
  width: 100%;
  margin-bottom: 12px;

  .ant-select-selector {
    display: flex !important;
    align-items: center;
    height: 39px !important;
    padding: 0 20px 0 12px !important;
    border-radius: 8px;
  }

  .ant-select-selection-item {
    display: flex !important;
    align-items: center;
    gap: 8px;
    line-height: 1;
  }

  .ant-select-arrow {
    height: 50px;
    display: flex;
    align-items: center;
    top: 0 !important;
    right: 8px !important;
    transform: none !important;
  }

  @media ${(props) => props?.theme?.breakpoints?.lgMax} {
    margin-bottom: 0;
  }
`;



export const LangOption = styled(Option)`
  display: flex;
  align-items: center;
  gap: 4px;
`;
