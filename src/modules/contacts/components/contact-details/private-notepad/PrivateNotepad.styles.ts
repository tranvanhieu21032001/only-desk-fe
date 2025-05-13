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
  justify-content: space-between;
  gap: 10px;

  padding: 16px;
`;

export const ConversationInfoWrap = styled.div`
  display: flex;
  gap: 16px;
  align-items: center;

  img {
    width: 40px;
    height: 40px;
    border-radius: 100px;
  }
`;

export const ConversationInfo = styled.div`
  display: flex;
  flex-direction: column;
`;
