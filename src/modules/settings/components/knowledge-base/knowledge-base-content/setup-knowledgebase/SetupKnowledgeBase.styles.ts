import fontWeight from '@/shared/styles/themes/default/fontWeight';
import { styled } from 'styled-components';

export const KnowledgeBaseInformationContainer = styled.section`
  height: calc(100vh - 140px);

  &::-webkit-scrollbar {
    width: 4px;
    height: 9px;
  }

  @media ${(props) => props?.theme?.breakpoints?.lgMax} {
    height: calc(100vh - 140px);
  }

  @media ${(props) => props?.theme?.breakpoints?.mdMax} {
    height: calc(100vh - 140px);
  }

  @media ${(props) => props?.theme?.breakpoints?.smMax} {
    height: calc(100vh - 180px);
  }

  @media ${(props) => props?.theme?.breakpoints?.xsMax} {
    height: calc(100vh - 220px);
  }
`;

export const KnowledgeBaseInformation = styled.div`
  padding: 12px;
  height: calc(100% - 100px);
  background-color: ${(props) => props?.theme?.colors?.newtralLightest};

  .ant-form {
    overflow-y: auto;
  }

    @media ${(props) => props?.theme?.breakpoints?.lgMax} {
     height: calc(100% - 10px);
  }
`;

export const KnowledgeBaseInformation2 = styled.div`
  padding: 12px;
  margin:4px 0;
  height: 60px;
  display:flex;
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
  margin-bottom: 24px;
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

  .ant-select-selector {
    padding: 12px;
  }
`;

export const WrapInput = styled.div`
  position: relative;
`;

export const Domain = styled.div`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: 12px;
  font-size: 12px;
  padding: 8px 10px;
  color: #253a8e;
  border-radius: 8px;
  background-color: #edf1f8;
`;

export const SectionBox = styled.div`
  display: flex;
  flex-direction: column;

  padding: 15px;
  border-radius: 8px;
  border: 1px solid #E8E8E8;
  margin-top: 10px;

  p {
    font-size: 18px;
    color: ${({ theme }) => theme.colors.secondaryDarker};
    line-height: 23px;
    font-weight: 600;
    border-bottom: 1px solid #ccc;
    padding-bottom: 10px;
  }
`;

export const WrapSection = styled.div`
  margin: 12px;
  display: flex;
  gap: 8px;
`;


export const Ordinal = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height:26px;
  width:26px;
  border-radius:9999px;
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
  justify-content:flex-end;
    gap:12px;
  button{
  width:fit-content;
  }
`;