import { styled } from 'styled-components';

export const ContactEmptyContainer = styled.section`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;

  height: 100%;
  padding-bottom: 40px;

  @media ${(props) => props?.theme?.breakpoints?.smMax} {
    .ant-image {
      max-width: 150px;
      max-height: 150px;

      img {
        max-width: 150px;
        max-height: 150px;
      }
    }
  }
`;

export const ContactActions = styled.div`
  margin-top: 24px;

  display: flex;
  gap: 10px;
  align-items: center;
  justify-content: center;

  button {
    width: fit-content;
  }

  @media ${(props) => props?.theme?.breakpoints?.smMax} {
    flex-direction: column;
  }
`;
