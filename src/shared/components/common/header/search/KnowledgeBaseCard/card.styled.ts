import styled from 'styled-components';

export const MessageCardContainer = styled.section`
  padding: 20px 24px;
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

  img {
    border: 1px solid ${({ theme }) => theme?.colors?.newtral};
    border-radius: ${({ theme }) => theme?.radius?.normalRadius};
  }
`;

export const Label = styled.div`
  p {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;
