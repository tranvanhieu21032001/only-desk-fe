import { Col } from 'antd';

import { css, styled } from 'styled-components';

export const AccountInformationContainer = styled.section`
  height: calc(100vh - 80px);
  overflow-y: scroll;

  &::-webkit-scrollbar {
    width: 4px;
    height: 9px;
  }

  @media ${(props) => props?.theme?.breakpoints?.lgMax} {
    height: calc(100vh - 140px);
  }

  @media ${(props) => props?.theme?.breakpoints?.mdMax} {
    height: calc(100vh - 140px);
  }

  @media ${(props) => props?.theme?.breakpoints?.smMax} {
    height: calc(100vh - 180px);
  }

  @media ${(props) => props?.theme?.breakpoints?.xsMax} {
    height: calc(100vh - 220px);
  }
`;

export const AccountInformation = styled.div`
  padding: 12px;
  background-color: ${(props) => props?.theme?.colors?.newtralLightest};

  .ant-form {
    overflow-y: auto;
  }
`;

export const LookingAccountInformation = styled.div`
  margin-top: 4px;
  padding: 20px 16px;
  background-color: ${(props) => props?.theme?.colors?.newtralLightest};

  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;

  button {
    height: 28px;
    width: fit-content;

    padding-top: 4px;
    padding-bottom: 4px;
  }
`;

export const LookingAccountWrap = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
`;

export const Automatically = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  justify-content: space-between;

  padding: 8px 12px;
  border-radius: ${(props) => props.theme.radius?.normalRadius};
  border: 1px solid ${(props) => props.theme.colors.newtral};
`;

export const AccountInformationLabel = styled.div`
  display: flex;
  gap: 14px;

  .ant-spin-dot-holder {
    color: ${(props) => props.theme.colors?.successDark};
  }

  p {
    font-size: 20px;
  }
`;

export const InformationBlock = styled.div`
  padding: 12px 12px 0;
  margin-top: 10px;
  border: 1px solid ${(props) => props.theme.colors.newtral};
  border-radius: ${(props) => props.theme.radius?.normalRadius};

  .ant-form-item {
    margin-bottom: 0px;
  }
`;

export const HeaderBlock = styled.div`
  padding: 8px;

  border-bottom: 1px solid ${(props) => props.theme.colors.newtral};
`;

export const BodyBlock = styled.div`
  padding: 8px;
`;

export const ImageUpload = styled.div<{ $isLoading?: boolean }>`
  position: relative;
  width: fit-content;

  ${({ $isLoading }) =>
    $isLoading &&
    css`
      .ant-image-img {
        opacity: 0.5;
        pointer-events: none;
      }
    `};
`;

export const Column = styled(Col)<{ $isEnableTwoFactor?: boolean }>`
  button {
    width: fit-content;

    ${({ $isEnableTwoFactor }) =>
      $isEnableTwoFactor &&
      css`
        border-color: ${(props) => props.theme.colors.errorDark};

        span {
          color: ${(props) => props.theme.colors.errorDark};
        }
      `}
  }

  p {
    height: 100%;

    display: flex;
    align-items: center;
  }

  img {
    border-radius: 100px;
    object-fit: cover;
  }

  .ant-spin {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    opacity: 1;
    z-index: 2;

    svg {
      color: ${(props) => props.theme.colors?.successDark};
    }
  }

  p {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    opacity: 1;
    z-index: 2;
  }

  @media ${(props) => props?.theme?.breakpoints?.smMax} {
    display: flex;
    align-items: center;
    justify-content: center;

    button {
      width: 100%;
    }
  }
`;

export const ButtonUpload = styled.div`
  button {
    width: fit-content;
  }

  @media ${(props) => props?.theme?.breakpoints?.smMax} {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
`;

export const ColumnAvatar = styled(Col)`
  display: flex;
  align-items: center;

  @media ${(props) => props?.theme?.breakpoints?.smMax} {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;
