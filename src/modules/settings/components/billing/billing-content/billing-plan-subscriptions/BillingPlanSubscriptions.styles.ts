import themeColors from '@/shared/styles/themes/default/colors';
import fontSize from '@/shared/styles/themes/default/fontSize';
import fontWeight from '@/shared/styles/themes/default/fontWeight';
import { css, styled } from 'styled-components';

export const BillingInformationContainer = styled.section`
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

export const BillingInformation = styled.div`
  padding: 12px;
  background-color: ${(props) => props?.theme?.colors?.newtralLightest};

  .ant-form {
    overflow-y: auto;
  }
`;

export const BillingInformationLabel = styled.div`
  display: flex;
  gap: 14px;

  p {
    font-size: 20px;
  }
`;

export const BillingInformationSubLabel = styled.div`
  display: flex;
margin:10px 0;

  p {
    font-size: 18px;
  }
`;

export const PlansWarning = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border:1px solid ${themeColors.newtral};
  padding:12px;
  margin:10px 0;
  border-radius:8px;
`

export const WraperSection = styled.div`
  display: flex;
  align-items: center;
  gap:12px;
  .ant-tag {
  margin-right:0px
  }

`

export const Name = styled.div`
font-weight:${fontWeight?.semiBold};
font-size:20px;

`

export const WraperPlanProfile = styled.div`
  display: flex;
  align-items: center;
  gap:36px;

`

export const BoxUnderLine = styled.div`
  display: inline-block;
  text-decoration: underline;
`

export const PlansBody = styled.div`
  border:1px solid ${themeColors.newtral};
  padding:12px;
  margin:10px 0;
  border-radius:8px;
`

export const PlanProfile = styled.div`
  border:1px solid ${themeColors.newtral};
  padding:12px 8px;
  display: flex;
  align-items: center;
  justify-content: space-between;
    margin:8px 0;
      border-radius:8px;
`

export const Avatar = styled.div`
width: 100px;
height: 100px;
border-radius: 1000px;

`
export const UserDetail = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

