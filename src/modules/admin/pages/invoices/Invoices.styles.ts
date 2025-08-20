import { styled } from 'styled-components';

export const InvoicesInformationContainer = styled.section`
  height: calc(100vh - 80px);
  overflow-y: scroll;
  overflow-x: hidden;
    flex:1;

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

export const InvoicesInformation = styled.div`
  padding: 12px;
  background-color: ${(props) => props?.theme?.colors?.newtralLightest};
  .ant-form {
    overflow-y: auto;
  }
`;


export const InvoicesInformationLabel = styled.div`
  display: flex;
  padding:10px 0;
  gap: 14px;

  p {
    font-size: 20px;
  }
`;

export const SkeletonWrapper = styled.div`
  padding: 20px 0;
  width: 100%;
`;