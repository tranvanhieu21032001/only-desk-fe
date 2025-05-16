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
  padding: 12px 16px;
  background-color: ${(props) => props?.theme?.colors?.newtralLightest};

  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 8px;

  button {
    width: fit-content;

    span {
      display: flex;
      gap: 8px;
    }
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
  padding: 8px 8px 12px;
`;

export const CardIntegrationWrap = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;

  padding: 8px 0 12px 0;
`;

export const CardIntegration = styled.div`
  padding: 12px;
  cursor: pointer;

  border: 1px solid ${(props) => props.theme.colors.newtral};
  border-radius: ${(props) => props.theme.radius?.normalRadius};

  box-shadow: 0px 0px 3px 0px #0000001a;

  display: flex;
  align-items: center;
  gap: 12px;

  p {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  img {
    border-radius: ${(props) => props.theme.radius?.smallRadius};
  }

  &:hover {
    transition: ease-in-out 0.3s;
    box-shadow: 0px 2px 8px 0px #0000001a;
    background-color: ${(props) => props.theme.colors.secondaryLight};
  }
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

  p {
    font-style: italic;
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
  gap: 8px;
  align-items: flex-end;
  justify-content: space-between;

  @media ${(props) => props?.theme?.breakpoints?.smMax} {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  button {
    width: fit-content;
  }

  div {
    width: 100%;
  }
`;
