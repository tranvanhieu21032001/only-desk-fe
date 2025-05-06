import styled from 'styled-components';

export const MessageCardContainer = styled.section`
  padding: 8px;
  border: 1px solid ${({ theme }) => theme?.colors?.newtral};
  border-radius: ${({ theme }) => theme?.radius?.normalRadius};

  display: flex;
  gap: 16px;
  align-items: center;

  cursor: pointer;

  &:hover {
    box-shadow: 0px 2px 8px 0px #1e266d0a;
    background-color: ${({ theme }) => theme?.colors?.secondaryLight};
  }
`;

export const ContentCardWrap = styled.div`
  width: calc(100% - 56px);
`;

export const LabelCardWrap = styled.div`
  display: flex;
  gap: 16px;
  align-items: center;
  justify-content: space-between;
`;

export const Label = styled.div`
  p {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

export const Description = styled.div`
  p {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;
