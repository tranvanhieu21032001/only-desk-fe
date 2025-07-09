import themeColors from '@/shared/styles/themes/default/colors';
import fontWeight from '@/shared/styles/themes/default/fontWeight';
import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 12px;
`;

export const Section = styled.div`
gap: 8px;
  padding: 12px;
border-radius: 8px;
border: 1px solid ${themeColors?.newtral};
hr{
border: 1px solid ${themeColors?.newtral};
  margin: 12px 0;
}

`;

export const SectionTitle = styled.h5`
  font-weight: 600;
  font-size: 14px;
  color:${themeColors?.secondaryDark};
`;

export const StyledTypography = styled.h3`
  font-weight: ${fontWeight.semiBold};
  color: ${themeColors.secondaryDark};
  font-size: 26px;
      margin-bottom: 12px;
`;

export const Label = styled.span`
  color:${themeColors?.newtralDark};
  display: block;
  margin-bottom: 8px;
`;

export const Content = styled.p`
  margin: 0 0 12px 0;
  color:${themeColors?.primary};
`;

export const StatusWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 4px;
`;
