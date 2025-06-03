import { styled } from 'styled-components';

export const Container = styled.div`
  padding: 10px;
  height: 100%;
  background: ${(props) => props.theme.colors.newtralLightest};
  border-radius: 8px;
`;

export const Header = styled.div`
  padding: 24px 0 0 0;
`;

export const Title = styled.p`
  color: ${(props) => props.theme.colors.secondaryDarker};
  font-size: 18px;
  font-weight: 600;
`;

export const ContentWrapper = styled.div`
  border: 1px solid ${(props) => props.theme.colors.newtral};
  border-radius: 8px;
  margin-top: 16px;
  padding: 0;
  background: #fff;
`;

export const SubHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px;
  border-bottom: 1px solid ${(props) => props.theme.colors.newtral};
`;

export const SubHeaderText = styled.p`
  color: ${(props) => props.theme.colors.secondaryDarker};
  font-size: 16px;
  font-weight: 600;
  margin: 0;
`;

export const EmptyContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  gap: 8px;
  padding: 40px 0 40px 0;
  min-height: 320px;
`;

export const EmptyImage = styled.img`
  width: 120px;
  height: 120px;
  margin-bottom: 16px;
`;

export const EmptyTitle = styled.p`
  color: ${(props) => props.theme.colors.newtralDark};
  font-size: 18px;
  font-weight: 600;
  margin: 0 0 4px 0;
`;

export const EmptyDesc = styled.p`
  color: ${(props) => props.theme.colors.newtralDarker};
  font-size: 15px;
  font-weight: 400;
  margin: 0;
`;

export const AutoSaveIndicator = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  background: #fff;
  border: 1px solid ${(props) => props.theme.colors.newtral};
  border-radius: 8px;     
  box-shadow: 0 1px 4px rgba(0,0,0,0.04);

  img {
    width: 16px;
    height: 16px;
  }

  p {
    color: ${(props) => props.theme.colors.newtralDarker};
    font-size: 15px;
    font-weight: 500;
    margin: 0;
  }
`;

export const DiffrentContainer = styled.div`
  margin-top: 5px;
  padding: 10px;
  width: 100%;
  background: #fff;
  border-radius: 8px;

  display: flex;
  justify-content: space-between;
  align-items: center;
`;
