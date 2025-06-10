import { styled } from 'styled-components';
import themeColors from '@/shared/styles/themes/default/colors';
import fontWeight from '@/shared/styles/themes/default/fontWeight';
export const PlanContainer = styled.div`
    background-color: ${(props) => props?.theme?.colors?.secondaryLight};
    border-radius:24px;
    padding:0 12px 12px 12px ;
`;



export const GroupLabels = styled.div`
  display: flex;
  justify-content: center;
  gap: 36px;
   padding:12px;
  align-items: center;
`;

export const Label = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  font-weight: ${fontWeight.medium};
  font-size: 16px;
`;

export const PlanList = styled.div`
  display: flex;
  flex-wrap: wrap;
   padding:12px;
   border-radius:12px;
   background-color: ${(props) => props?.theme?.colors?.newtralLightest};
  justify-content: center;
`;


export const WrapPlanCard = styled.div`
 flex: 1 1 25%;
   padding:12px;
    border-right: 1px solid ${themeColors.newtral};
      &:last-child {
    border-right: none;
  }
`;

export const PlanCard = styled.div<{ isDark?: boolean }>`
  flex: 1 1 25%;
  padding: 12px 24px;
  gap: 16px;
  border-radius: 12px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
  background-color: ${({ isDark }) => isDark ? themeColors.secondaryDark : themeColors.newtralLightest};
  color: ${({ isDark }) => isDark ? themeColors.newtralLightest : themeColors.newtralDark};


  h3, p, span, li, div, strong {
    color: ${({ isDark }) => isDark ? themeColors.newtralLightest : 'inherit'};
  }
`;



export const PlanTitle = styled.h3`
  font-size: 26px;
  padding:4px 0;
  font-weight: ${fontWeight.semiBold};
  color: ${themeColors?.secondaryDark};
`;

export const PlanDesc = styled.p`
  font-size: 12px;
  margin-bottom:24px;
   min-height: 60px;
  color: ${themeColors.newtralDark};
  line-height:20px;
`;

export const PlanPriceGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  color: ${themeColors.newtralDark};

  span {
    font-size: 16px;
    font-weight: ${fontWeight.medium};
  }
`;

export const PlanPrice = styled.div<{ isDark?: boolean }>`
  font-size: 32px;
  font-weight: ${fontWeight.bold};
  color: ${({ isDark }) => isDark ? themeColors.newtralLightest : themeColors.primary};
`;


export const GroupButton = styled.div`
  padding: 24px 0;
  display: flex;
  align-items: center;
  justify-content: center;
  span{
  color:unset !important}
`;

export const Placholder = styled.div`
 min-height: 45px;
`;

export const Details = styled.div`
  padding: 24px 0;
`;

export const DetailItem = styled.div`
   display: flex;
align-items: center;
gap:10px;
 &:last-child {
   margin-top:12px;
  }
`;




export const SectionList = styled.ul<{ isDark?: boolean }>`
  list-style: none;
  padding: 0;
  margin: 0;
  padding:24px 0;
  li {
    display: flex;
    align-items: center;
    gap: 10px;
    color: ${({ isDark }) => isDark ? themeColors.newtralLightest : themeColors.newtralDark};
    margin-bottom: 12px;
    font-weight: 400;
    font-size: 14px;
    line-height: 23px;
    letter-spacing: 0%;
    text-align: center;
  }
`;


export const ChooseButton = styled.button`
  margin-top: auto;
  padding: 10px 16px;
  border: none;
  border-radius: 8px;
  background-color: #253A8E;
  color: #fff;
  font-weight: ${fontWeight.medium};
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #1b2e6f;
  }
`;
