import styled from 'styled-components';

export const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  position: relative;
  padding: 15px;

  @keyframes show {
    0% {
      opacity: 0;
    }
    50% {
      opacity: 0.5;
    }
    100% {
      opacity: 1;
    }
  }

  animation: show 2s ease;
`;

export const Content = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-bottom: 60px;

  span {
    text-align: -webkit-center;
    font-size: ${({ theme }) => theme?.fontSize?.xl};
    font-weight: ${({ theme }) => theme?.fontWeight?.bold};
    color: ${({ theme }) => theme?.colors?.primary};
    line-height: 24px;

    margin-bottom: 60px;
  }
`;

export const ButtonWrap = styled.div`
  display: flex;
  justify-content: center;
  gap: 16px;
`;
