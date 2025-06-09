import { styled } from 'styled-components';
import themeColors from '@/shared/styles/themes/default/colors';
import fontWeight from '@/shared/styles/themes/default/fontWeight';

export const ChangePlanInformationContainer = styled.section`
  width: 100vw;
  height: calc(100vh - 80px);
  overflow-y: scroll;
  overflow-x: hidden;

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

export const ChangePlanInformation = styled.div`
  padding: 12px;
  background-color: ${(props) => props?.theme?.colors?.newtralLightest};

  .ant-form {
    overflow-y: auto;
  }
`;

export const BackToPlan = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 0;
  cursor: pointer;
  font-weight: ${fontWeight.light};
  color: ${themeColors.newtralDark};

  &:hover {
    text-decoration: underline;
  }
`;

export const Title = styled.h2`
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: ${fontWeight.semiBold};
  font-size: 20px;
`;

export const StepsContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 100px;
  align-items: center;
  padding: 24px 173px;
  position: relative;
`;

export const StepItem = styled.div<{ active?: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  z-index: 1;
  padding: 0 10px;
  cursor: pointer;

  font-weight: ${({ active }) =>
        active ? fontWeight.semiBold : fontWeight.medium};
  color: ${({ active, theme }) =>
        active ? '#253A8E' : theme.colors.newtralLight};

  &:not(:last-child)::after {
    content: "";
    position: absolute;
    top: 16px;
    left: 100%;
    width: 100px;
    height: 3px;
    background-color: ${({ theme }) => theme.colors.newtral};
    z-index: 0;
  }

  &:not(:first-child)::before {
    content: "";
    position: absolute;
    top: 16px;
    right: 100%;
    width: 100px;
    height: 3px;
    background-color: ${({ theme }) => theme.colors.newtral};
    z-index: 0;
  }
`;


