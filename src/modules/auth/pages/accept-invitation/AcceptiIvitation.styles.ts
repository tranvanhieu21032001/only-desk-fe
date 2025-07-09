import { styled } from 'styled-components';

export const SignInWrap = styled.section`
  display: flex;
  align-items: stretch;
  width: 100vw;
  height: 100vh;
  max-height: 100vh;

  @media (max-width: ${(props) =>
      props?.theme?.breakpoints?.smMax || '480px'}) {
    flex-direction: column;
    height: auto;
    margin: 0;
  }
`;

export const ImageSection = styled.div`
  position: relative;
  height: 100%;
  width: 40%;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    background-size: cover;
  }

  .ant-image {
    height: 100% !important;
    width: 100%;
  }

  .ant-image .ant-image-img {
    height: 100% !important;
  }

  @media (max-width: 768px) {
    display: none !important;
    width: 0 !important;
    height: 0 !important;
    overflow: hidden;
  }
`;


export const WrapperBody = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 24px;
  padding: 32px;
  background-color: #fff;
  max-width: 500px;
  margin: 0 auto;

  @media (max-width: 480px) {
    padding: 24px 16px;
  }
`;

export const WrapperUser = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  border: 1px solid #e8e8e8;
  border-radius: 10px;
  padding:8px 12px;
`;

export const Avatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 9999px;
  overflow: hidden;

  .ant-image,
  .ant-image-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 50%;
  }
`;

export const WrapperDetail = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  > *:first-child {
    font-weight: 600;
    font-size: 16px;
  }

  > *:last-child {
    font-size: 14px;
  }
`;
