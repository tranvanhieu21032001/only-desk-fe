import PhoneInputWithCountrySelect from "react-phone-number-input";
import styled from "styled-components";
import "react-phone-number-input/style.css";

export const PhoneNumberWrapper = styled(PhoneInputWithCountrySelect)`
  width: 100%;
  height: 48px;
  border-radius: 8px;
  border: 1px solid ${(props) => props.theme.colors.newtral};

  font-weight: ${({ theme }) => theme.fontWeight.regular};
  font-size: ${({ theme }) => theme.fontSize.base};
  line-height: 24px;
  color: ${(props) => props.theme.colors.primary};

  &.PhoneInput--disabled {
    font-weight: ${({ theme }) => theme.fontWeight.regular};
    font-size: ${({ theme }) => theme.fontSize.base};
    line-height: 24px;
    color: ${(props) => props.theme.colors.newtralLight};
    background-color: rgba(0, 0, 0, 0.04) !important;
    border-color: #d9d9d9;

    &:hover {
      border-color: #d9d9d9 !important;
    }
  }

  &.PhoneInput--focus{
    border-color: ${(props) => props.theme.colors.secondaryDark} !important;
  }

  &:hover {
    border: 1px solid ${(props) => props.theme.colors.secondaryDark} !important;
  }

  .PhoneInputCountry {
    padding: 12px 10px;
    border-radius: 8px;

    .PhoneInputCountryIcon {
      width: 30px;
      height: 20px;

      img {
        width: 30px;
        height: 20px;
      }
    }
    .PhoneInputCountryIcon--border {
      box-shadow: none !important;
    }
  }

  input {
    padding: 12px 10px;
    border: none;
    border-radius: 8px;
    height: 45px !important;

    font-weight: ${({ theme }) => theme.fontWeight.regular};
    font-size: ${({ theme }) => theme.fontSize.base};
    line-height: 24px;
    color: ${(props) => props.theme.colors.primary};

    &::placeholder {
      font-weight: ${({ theme }) => theme.fontWeight.regular};
      font-size: ${({ theme }) => theme.fontSize.base};
      line-height: 24px;
      color: ${(props) => props.theme.colors.newtralLight};
    }

    &:disabled {
      opacity: 1.3 !important;

      font-weight: ${({ theme }) => theme.fontWeight.regular};
      font-size: ${({ theme }) => theme.fontSize.base};
      line-height: 24px;
      color: ${(props) => props.theme.colors.newtralDark};
      border-color: ${(props) => props.theme.colors.borderDisabled};
    }
  }
`;
