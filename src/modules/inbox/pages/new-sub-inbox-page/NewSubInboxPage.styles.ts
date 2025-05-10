import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-top: 8px;
`;

export const StepContent = styled.div<{ isStep2?: boolean }>`
  display: flex;
  flex-direction: column;
  margin-top: 10px;
  ${({ isStep2 }) =>
    isStep2 &&
    `
      height: 500px;
      min-height: 500px;
      max-height: 500px;
      overflow-y: auto;
    `}
`;

export const StepContentInner = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

export const Label = styled.div`
  margin-bottom: 8px;
  font-size: ${(props) => props.theme.fontSize.base};
  font-weight: ${(props) => props.theme.fontWeight.semiBold};
`;

export const LabelP = styled.p`
  font-size: ${(props) => props.theme.fontSize.sm};
  font-weight: ${(props) => props.theme.fontWeight.regular};
  margin-bottom: 30px;
`;

export const LabelText = styled.p`
  font-size: ${(props) => props.theme.fontSize.base};
  font-weight: ${(props) => props.theme.fontWeight.regular};
`;

export const LabelRequiredStar = styled.span`
  color: ${(props) => props.theme.colors.errorDark};
  margin-left: 2px;
`;

export const IconNameRow = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const IconBox = styled.div`
  width: 47px;
  height: 47px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: ${(props) => props.theme.radius.normalRadius};
  border: 1px solid ${(props) => props.theme.colors.newtral};

  img {
    width: 15px;
    height: 15px;
  }
`;

export const NameInput = styled.input`
  padding: 0 10px;
  width: 100%;
  height: 47px;
  border-radius: ${(props) => props.theme.radius.smallRadius};
  border: 1px solid ${(props) => props.theme.colors.newtral};
  outline: none;
  transition: border 0.2s;
`;

export const LabelColumn = styled.div`
  display: flex;
  gap: 5px;
  flex-direction: column;
`;

export const LabelInput = styled.div`
  display: flex;
  gap: 5px;
  flex-direction: column;
  width: 100%;
`;

export const AccessBox = styled.div`
  display: flex;
  gap: 12px;
  background: ${(props) => props.theme.colors.newtralLightest};
  border: 1px solid ${(props) => props.theme.colors.newtral};
  border-radius: ${(props) => props.theme.radius.mediumRadius};
  padding: 18px 20px;
  margin-bottom: 24px;
`;

export const AccessIcon = styled.img`
  width: 28px;
  height: 28px;
`;

export const AccessTitle = styled.div`
  font-weight: ${(props) => props.theme.fontWeight.semiBold};
  font-size: ${(props) => props.theme.fontSize.lg};
  line-height: 29px;
`;

export const AccessDesc = styled.div`
  font-size: ${(props) => props.theme.fontSize.base};
  color: ${(props) => props.theme.colors.newtralLight};
  font-weight: ${(props) => props.theme.fontWeight.regular};
`;

export const AccessRadioRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
`;

export const FooterWrapper = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  margin-bottom: 12px;
`;

export const AccessRadioLabel = styled.div`
  font-weight: ${(props) => props.theme.fontWeight.medium};
  color: ${(props) => props.theme.colors.primary};
`;

export const AccessRadioInput = styled.input`
  accent-color: ${(props) => props.theme.colors.primaryDark};
`;

export const AccessSwitchWrapper = styled.label`
  position: relative;
  display: inline-block;
  width: 48px;
  height: 28px;
`;

export const AccessSwitchInput = styled.input.attrs({ type: 'checkbox' })`
  opacity: 0;
  width: 0;
  height: 0;
  &:checked + span {
    background: ${(props) => props.theme.colors.borderDark};
  }
  &:checked + span:before {
    transform: translateX(20px);
  }
  &:disabled + span {
    background: ${(props) => props.theme.colors.borderDisabled};
    cursor: not-allowed;
  }
  &:disabled + span:before {
    background: ${(props) => props.theme.colors.newtral};
  }
`;

export const AccessSwitchSlider = styled.span`
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: ${(props) => props.theme.colors.borderDisabled};
  border-radius: 999px;
  transition: background 0.2s;
  box-shadow: ${(props) => props.theme.shadow.smallShadow};
  &:before {
    content: '';
    position: absolute;
    left: 4px;
    top: 4px;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: ${(props) => props.theme.colors.newtralLightest};
    transition:
      transform 0.2s,
      background 0.2s;
    box-shadow: ${(props) => props.theme.shadow.smallShadow};
    display: flex;
    align-items: center;
    justify-content: center;
  }
  &:after {
    content: '';
    position: absolute;
    top: 50%;
    left: 9px;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: ${(props) => props.theme.colors.newtralDarker};
    transform: translateY(-50%);
    transition:
      left 0.2s,
      background 0.2s;
  }
  input:checked + &::after {
    left: 31px;
    background: ${(props) => props.theme.colors.borderDark};
  }
  input:disabled + &::after {
    background: ${(props) => props.theme.colors.newtral};
  }
`;

export const ConditionsBox = styled.div`
  display: flex;
  align-items: flex-start;
  background: ${(props) => props.theme.colors.newtralLightest};
  border: 1px solid ${(props) => props.theme.colors.newtral};
  border-radius: ${(props) => props.theme.radius.mediumRadius};
  padding: 18px 20px;
`;

export const ConditionsIcon = styled.span`
  margin-right: 8px;
`;

export const ConditionsTitle = styled.div`
  font-weight: ${(props) => props.theme.fontWeight.semiBold};
  font-size: ${(props) => props.theme.fontSize.lg};
  font-height: 29px;
`;

export const ConditionsDesc = styled.div`
  font-size: ${(props) => props.theme.fontSize.base};
  font-height: 26px;
  color: ${(props) => props.theme.colors.newtralLight};
  font-weight: ${(props) => props.theme.fontWeight.regular};
  margin-top: 5px;
`;

export const ConditionsSelect = styled.select`
  width: 100%;
  height: 44px;
  border-radius: ${(props) => props.theme.radius.normalRadius};
  border: 1px solid ${(props) => props.theme.colors.newtral};
  font-size: ${(props) => props.theme.fontSize.md};
  padding: 0 12px;
  color: ${(props) => props.theme.colors.newtralLight};
  background: ${(props) => props.theme.colors.newtralLightest};
  margin-top: 8px;
  margin-bottom: 24px;
`;

export const ConditionsRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: auto;
`;

export const FilterBox = styled.div<{ isOpen: boolean }>``;

export const FilterDropdown = styled.div`
  margin-top: 8px;
`;

export const ModalFilterWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const MainFilterDropdownWrapper = styled.div`
  position: relative;
  z-index: 2;
`;

export const ButtonModalDropdown = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  background: ${(props) => props.theme.colors.newtralLightest};
  cursor: pointer;
  font-size: ${(props) => props.theme.fontSize.base};
  color: ${(props) => props.theme.colors.newtralLight};
  height: 39px;
  padding: 8px 16px;
  border-radius: ${(props) => props.theme.radius.normalRadius};
  border: 1px solid ${(props) => props.theme.colors.newtral};
`;

export const ModalDropdownBorder = styled.div`
  position: absolute;
  padding: 8px 10px;
  top: 100%;
  left: 0;
  right: 0;
  background: ${(props) => props.theme.colors.newtralLightest};
  border: 1px solid ${(props) => props.theme.colors.newtral};
  border-radius: ${(props) => props.theme.radius.normalRadius};
  margin-top: 4px;
  z-index: 10;
  max-height: 320px;
  overflow-y: auto;
  box-shadow: ${(props) => props.theme.shadow.normalShadow};
`;

export const SearchWrapper = styled.div`
  padding: 8px;
  border: 1px solid ${(props) => props.theme.colors.newtral};
  display: flex;
  align-items: center;
  border-radius: ${(props) => props.theme.radius.normalRadius};
  gap: 8px;
`;

export const SearchIconDropdown = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const SearchInputDropdown = styled.input`
  border: none;
  outline: none;
  width: 100%;
  font-size: ${(props) => props.theme.fontSize.base};
  color: ${(props) => props.theme.colors.newtralLight};

  &::placeholder {
    color: ${(props) => props.theme.colors.newtralDarker};
  }
`;

export const DropdownBorder = styled.div`
  padding: 8px 12px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: ${(props) => props.theme.fontSize.base};
  color: ${(props) => props.theme.colors.newtralLight};

  &:hover {
    background: ${(props) => props.theme.colors.secondaryLight};
  }
`;

export const NestedFilterBox = styled.div`
  border: 1px solid ${(props) => props.theme.colors.newtral};
  border-radius: ${(props) => props.theme.radius.normalRadius};
  padding: 12px;
`;

export const ModalWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;

  span {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: ${(props) => props.theme.fontSize.base};
    color: ${(props) => props.theme.colors.newtralLight};
  }
`;

export const FilterLabelClearWrapper = styled.div`
  cursor: pointer;
  padding: 4px;
  border-radius: ${(props) => props.theme.radius.smallRadius};

  &:hover {
    background: ${(props) => props.theme.colors.secondaryLight};
  }
`;

export const ConditionDropdownWrapper = styled.div`
  position: relative;
  z-index: 2;
`;

export const ModalDropdownBox = styled.div`
  position: absolute;
  padding: 8px 10px;
  top: 100%;
  left: 0;
  right: 0;
  background: ${(props) => props.theme.colors.newtralLightest};
  border: 1px solid ${(props) => props.theme.colors.newtral};
  border-radius: ${(props) => props.theme.radius.normalRadius};
  margin-top: 4px;
  z-index: 10;
  max-height: 320px;
  overflow-y: auto;
  box-shadow: ${(props) => props.theme.shadow.normalShadow};
`;

export const ConditionSearchBox = styled.div``;

export const ConditionSearchWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 10px;
  border: 1px solid ${(props) => props.theme.colors.newtral};
  border-radius: ${(props) => props.theme.radius.normalRadius};
`;

export const ConditionSearchIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ConditionSearchInput = styled.input`
  border: none;
  outline: none;
  width: 100%;
  font-size: ${(props) => props.theme.fontSize.base};
  color: ${(props) => props.theme.colors.newtralLight};

  &::placeholder {
    color: ${(props) => props.theme.colors.newtralDarker};
  }
`;

export const DropdownItem = styled.div`
  padding: 8px 12px;
  cursor: pointer;
  font-size: ${(props) => props.theme.fontSize.base};
  color: ${(props) => props.theme.colors.newtralLight};

  &:hover {
    background: ${(props) => props.theme.colors.secondaryLight};
  }
`;

export const InputWrapperAdd = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 4px 8px;
  border: 1px solid ${(props) => props.theme.colors.newtral};
  border-radius: ${(props) => props.theme.radius.smallRadius};
  background: ${(props) => props.theme.colors.newtralLightest};

  span {
    font-size: ${(props) => props.theme.fontSize.base};
    color: ${(props) => props.theme.colors.newtralLight};
  }
`;

export const CloseIconWrapper = styled.div`
  cursor: pointer;
  padding: 4px;
  border-radius: ${(props) => props.theme.radius.smallRadius};

  &:hover {
    background: ${(props) => props.theme.colors.secondaryLight};
  }
`;

export const CloseIconImg = styled.img`
  width: 16px;
  height: 16px;
`;

export const ModalInputCustom = styled.input`
  border: none;
  outline: none;
  width: 100%;
  font-size: ${(props) => props.theme.fontSize.base};
  color: ${(props) => props.theme.colors.newtralLight};

  &::placeholder {
    color: ${(props) => props.theme.colors.newtralDarker};
  }
`;

export const AddConditionWrapper = styled.div`
  margin-top: 16px;
  display: flex;
  justify-content: center;
`;

export const CountryInputWrapper = styled.div`
  position: relative;
  z-index: 2;
  margin-top: 12px;
`;

export const CountryWrapper = styled.div`
  display: flex;
  gap: 5px;
  align-items: center;
`;

export const CountrySelectBox = styled.div<{ isSelected?: boolean }>`
  width: 100%;
  border: 1px solid ${(props) => props.theme.colors.newtral};
  border-radius: ${(props) => props.theme.radius.normalRadius};
  padding: 8px 16px;
  color: ${({ isSelected, theme }) =>
    isSelected ? theme.colors.primary : theme.colors.newtralDarker};
  background: ${(props) => props.theme.colors.newtralLightest};
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
`;

export const CountryDropdownContainer = styled.div`
  position: absolute;
  top: 110%;
  left: 0;
  right: 0;
  background: ${(props) => props.theme.colors.newtralLightest};
  border: 1px solid ${(props) => props.theme.colors.newtral};
  border-radius: ${(props) => props.theme.radius.normalRadius};
  z-index: 10;
  box-shadow: ${(props) => props.theme.shadow.normalShadow};
  padding: 8px 10px;
  max-height: 320px;
  overflow-y: auto;
`;

export const CountryDropdownInput = styled.input`
  width: 100%;
  border: none;
  outline: none;
  font-size: ${(props) => props.theme.fontSize.base};
  border-radius: ${(props) => props.theme.radius.normalRadius};
  height: 39px;
  color: ${(props) => props.theme.colors.newtralLight};
  background: transparent;
  padding: 8px;
  border: 1px solid ${(props) => props.theme.colors.newtral};
`;

export const CountryDropdownItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  cursor: pointer;
  border-radius: ${(props) => props.theme.radius.smallRadius};
  font-size: 15px;
  color: ${(props) => props.theme.colors.primary};
  &:hover {
    background: ${(props) => props.theme.colors.secondaryLight};
  }
`;

export const CountryFlagImg = styled.img`
  width: 20px;
  margin-right: 8px;
`;
