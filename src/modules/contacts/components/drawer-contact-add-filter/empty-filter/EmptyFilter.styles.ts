import { styled } from 'styled-components';

export const ContactEmptyContainer = styled.section`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;

  height: 100%;

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
