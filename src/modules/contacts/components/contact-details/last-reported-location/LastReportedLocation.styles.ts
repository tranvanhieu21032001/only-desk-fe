import { Image } from 'antd';
import { styled } from 'styled-components';

export const Container = styled.section`
  padding: 12px;
  margin-top: 12px;

  border: 1px solid ${(props) => props?.theme?.colors?.newtral};
  border-radius: ${(props) => props?.theme?.radius?.normalRadius};
`;

export const Header = styled.div`
  margin-bottom: 8px;
  padding: 11px 8px;

  display: flex;
  align-items: center;
  gap: 10px;

  border-bottom: 1px solid ${(props) => props?.theme?.colors?.newtral};
`;

export const Body = styled.div``;

export const ContentWrap = styled.div`
  display: flex;
  align-items: center;

  p {
    padding: 10px 0px !important;

    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  p:first-of-type {
    min-width: 120px;
  }
`;


export const Flag2 = styled(Image)`
`;



export const EmptyWrap = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;
