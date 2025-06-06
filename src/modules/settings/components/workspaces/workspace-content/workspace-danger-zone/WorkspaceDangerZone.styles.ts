import { styled } from 'styled-components';

export const AccountInformationContainer = styled.section`
  height: calc(100vh - 80px);
  overflow-y: scroll;

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

export const AccountInformation = styled.div`
  padding: 12px;
  background-color: ${(props) => props?.theme?.colors?.newtralLightest};

  .ant-form {
    overflow-y: auto;
  }
`;

export const AccountInformationLabel = styled.div`
  p {
    font-size: 20px;
  }
`;

export const WorkspaceRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  padding-top: 10px;
`;

export const CopyBox = styled.div`
  display: flex;
  flex-direction: column;

  padding: 15px;
  border-radius: 8px;
  border: 1px solid #ccc;
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
