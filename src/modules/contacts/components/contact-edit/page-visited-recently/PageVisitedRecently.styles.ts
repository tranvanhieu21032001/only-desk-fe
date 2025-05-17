import { styled } from 'styled-components';

export const Container = styled.section`
  padding: 12px;
  margin-top: 12px;

  border: 1px solid ${(props) => props?.theme?.colors?.newtral};
  border-radius: ${(props) => props?.theme?.radius?.normalRadius};
`;

export const Header = styled.div`
  border-bottom: 1px solid ${(props) => props?.theme?.colors?.newtral};

  display: flex;
  align-items: center;
  gap: 10px;
  justify-content: space-between;
`;

export const HeaderWrap = styled.div`
  margin-bottom: 8px;
  padding: 11px 8px;

  display: flex;
  align-items: center;
  gap: 10px;

  svg {
    color: ${(props) => props?.theme?.colors?.secondaryDarker};
  }

  &:hover {
    cursor: pointer;
    text-decoration: underline;
    color: ${(props) => props?.theme?.colors?.secondaryDarker};
  }
`;

export const ConversationCount = styled.div`
  padding: 8px 16px;
  border-radius: 100px;
  background-color: #e8f0fd;

  width: 36px;
  aspect-ratio: 1/1;

  display: flex;
  align-items: center;
  justify-content: center;
`;

export const HeaderActionWrap = styled.div`
  margin-bottom: 8px;
  padding: 11px 8px;

  display: flex;
  align-items: center;
  gap: 10px;

  cursor: pointer;

  &:hover {
    text-decoration: underline;
    color: ${(props) => props?.theme?.colors?.secondaryDarker};
  }

  svg {
    color: ${(props) => props?.theme?.colors?.secondaryDarker};
  }
`;

export const Body = styled.div`
  margin-top: 8px;
`;

export const ContentWrap = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;

  p {
    padding: 10px 8px;

    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  p:first-of-type {
    min-width: 120px;
  }
`;

export const ConversationCardWrap = styled.div`
  display: flex;
  gap: 10px;
  justify-content: space-between;

  padding: 8px;
  margin-top: 8px;
`;

export const ConversationInfoWrap = styled.div`
  display: flex;
  gap: 16px;
  align-items: center;
  justify-content: space-between;

  img {
    width: 40px;
    height: 40px;
    border-radius: 100px;
  }
`;

export const DeviceInformation = styled.div`
  gap: 8px;
`;

export const ConversationInfo = styled.div`
  display: flex;
  gap: 8px;

  p {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

export const TimeOnWebSiteWrap = styled.div`
  display: grid;
  grid-template-columns: calc(30% - 4px) calc(70% - 4px);
  gap: 8px;
  align-items: center;

  @media ${(props) => props?.theme?.breakpoints?.smMax} {
    grid-template-columns: 1fr;
  }
`;

export const TimeOnWebSite = styled.div`
  padding: 12px;
  border-radius: ${(props) => props?.theme?.radius?.normalRadius};

  border: 1px solid ${(props) => props?.theme?.colors?.newtral};

  height: 100%;
`;

export const TimeOnWebHeader = styled.div`
  padding-bottom: 4px;
  border-bottom: 1px solid ${(props) => props?.theme?.colors?.newtral};
`;

export const TimeOnWebBody = styled.div`
  margin-top: 4px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  height: 70%;

  p {
    font-size: 20px;
  }
`;

export const DeviceBody = styled.div`
  margin-top: 4px;
  display: flex;
  justify-content: space-between;
`;
