import styled from 'styled-components';

export const Container = styled.div`
  padding: 12px;
  width: 100%;
  height: 100%;
  background-color: ${(props) => props?.theme?.colors?.newtralLightest};
  overflow: hidden;
  border-top-left-radius: ${(props) => props?.theme?.radius?.normalRadius};
  border-bottom-left-radius: ${(props) => props?.theme?.radius?.normalRadius};
  display: flex;
  flex-direction: column;
`;

export const SearchFilterWrapper = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
  align-items: center;
  width: 100%;
  position: sticky;
  top: 0;
  z-index: 2;
  background: ${(props) => props?.theme?.colors?.newtralLightest};
`;

export const SearchInputWrapper = styled.div`
  flex-grow: 1;
  min-width: 0;
  height: 39px;
  display: flex;
  align-items: center;
  border: 1px solid ${(props) => props?.theme?.colors?.newtralDarker};
  border-radius: ${(props) => props?.theme?.radius?.normalRadius};
  padding: 0 12px;
  background-color: ${(props) => props?.theme?.colors?.newtralLightest};
  gap: 8px;
`;

export const SearchInput = styled.input`
  flex: 1;
  border: none;
  outline: none;
  background: transparent;
  font-size: ${(props) => props?.theme?.fontSize?.base};
  min-width: 0;
`;

export const SearchIcon = styled.div`
  width: 20px;
  height: 20px;
  flex-shrink: 0;

  img,
  svg {
    top: -4px;
    position: relative;
  }
`;

export const Button = styled.button<{ active?: boolean }>`
  flex-shrink: 0;
  width: max-content;
  padding: 8px 16px;
  height: 39px;
  border-radius: ${(props) => props?.theme?.radius?.normalRadius};
  font-size: ${(props) => props?.theme?.fontSize?.base};
  line-height: 23px;
  color: ${(props) => props?.theme?.colors?.primary};
  border: ${({ active, theme }) =>
    active ? `1px solid ${theme.colors.borderDark}` : '1px solid #ccc'};
  background: ${(props) => props?.theme?.colors?.newtralLightest};
  cursor: pointer;

  img,
  svg {
    width: 20px;
    height: 20px;
    padding-right: 5px;
  }
`;

export const ButtonDropdown = styled.button`
  flex-shrink: 0;
  width: max-content;
  padding: 8px 16px;
  height: 39px;
  border-radius: ${(props) => props?.theme?.radius?.normalRadius};
  font-size: ${(props) => props?.theme?.fontSize?.base};
  line-height: 23px;
  color: ${(props) => props?.theme?.colors?.primary};
  border: 1px solid ${(props) => props?.theme?.colors?.newtralDarker};
  background: ${(props) => props?.theme?.colors?.newtralLightest};
  cursor: pointer;

  img,
  svg {
    width: 20px;
    height: 20px;
    padding-right: 5px;
  }
`;

export const ButtonModalDropdown = styled.button`
  flex-shrink: 0;
  width: 100%;
  padding: 8px 16px;
  height: 39px;
  border-radius: ${(props) => props?.theme?.radius?.normalRadius};
  font-size: ${(props) => props?.theme?.fontSize?.base};
  line-height: 23px;
  color: ${(props) => props?.theme?.colors?.newtralLight};
  border: 1px solid ${(props) => props?.theme?.colors?.newtralDarker};
  background: ${(props) => props?.theme?.colors?.newtralLightest};
  cursor: pointer;
  display: flex;
  justify-content: space-between;

  img,
  svg {
    width: 20px;
    height: 20px;
    padding-right: 5px;
  }
`;

export const NotificationItem = styled.div`
  display: flex;
  align-items: center;
  padding: 12px;
  border-radius: ${(props) => props?.theme?.radius?.mediumRadius};
  margin-bottom: 12px;
  cursor: pointer;

  &:hover {
    background-color: ${(props) => props?.theme?.colors?.newtralLighter};
  }
`;

export const Avatar = styled.div`
  margin-right: 12px;
`;

export const Content = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  min-width: 0;
`;

export const Title = styled.div`
  font-size: ${(props) => props?.theme?.fontSize?.base};
  line-height: 23px;
  font-weight: ${(props) => props?.theme?.fontWeight?.semiBold};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const Subtitle = styled.div`
  color: ${(props) => props?.theme?.colors?.newtralLight};
  line-height: 23px;
  font-weight: ${(props) => props?.theme?.fontWeight?.regular};
  font-size: ${(props) => props?.theme?.fontSize?.base};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const RightSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  position: relative;
  min-width: 50px;
`;

export const Time = styled.div`
  color: ${(props) => props?.theme?.colors?.newtralDark};
  font-weight: ${(props) => props?.theme?.fontWeight?.regular};
  line-height: 20px;
  font-size: ${(props) => props?.theme?.fontSize?.sm};

  ${NotificationItem}:hover & {
    visibility: hidden;
  }
`;

export const BarIcon = styled.div`
  display: none;
  cursor: pointer;
  padding: 4px;
  position: absolute;
  top: 0;
  right: 0;

  img {
    width: 16px;
    height: 16px;
  }

  ${NotificationItem}:hover & {
    display: block;
  }
`;

export const Badge = styled.div`
  width: 20px;
  height: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props?.theme?.colors?.errorDark};
  color: ${(props) => props?.theme?.colors?.newtralLightest};
  font-size: ${(props) => props?.theme?.fontSize?.sm};
  border-radius: 50%;
  margin-top: 15px;
  margin-right: 2px;

  ${NotificationItem}:hover & {
    margin-top: 15px;
  }
`;

export const MenuDropdown = styled.div<{ isOpen: boolean }>`
  position: absolute;
  top: calc(100% + 8px);
  right: 0;
  background: ${(props) => props?.theme?.colors?.newtralLighter};
  border-radius: ${(props) => props?.theme?.radius?.normalRadius};
  box-shadow: ${(props) => props?.theme?.shadow?.normalShadow};
  display: ${({ isOpen }) => (isOpen ? 'block' : 'none')};
  z-index: 1000;
  min-width: 200px;
  padding: 8px 0;
`;

export const MenuItem = styled.div`
  display: flex;
  align-items: center;
  padding: 8px 16px;
  font-size: ${(props) => props?.theme?.fontSize?.base};
  color: ${(props) => props?.theme?.colors?.primary};
  cursor: pointer;
  gap: 8px;

  img {
    width: 16px;
    height: 16px;
  }

  &.delete {
    color: ${(props) => props?.theme?.colors?.errorDark};
  }
`;

export const AllDropdown = styled.div`
  position: absolute;
  top: 110%;
  right: 0;
  width: 200px;
  background: ${(props) => props?.theme?.colors?.newtralLightest};
  border: 1px solid ${(props) => props?.theme?.colors?.newtral};
  border-radius: ${(props) => props?.theme?.radius?.mediumRadius};
  box-shadow: ${(props) => props?.theme?.shadow?.normalShadow};
  overflow: hidden;
  z-index: 1000;

  &.align-left {
    left: auto;
    right: 0;
  }
`;

export const ModalDropdown = styled.div`
  position: absolute;
  top: 110%;
  right: 0;
  width: 100%;
  min-width: 100%;
  max-width: 100%;
  background: ${(props) => props?.theme?.colors?.newtralLightest};
  box-shadow: ${(props) => props?.theme?.shadow?.largeShadow};
  border-radius: ${(props) => props?.theme?.radius?.normalRadius};
  overflow: hidden;
  z-index: 2000;

  &.align-left {
    left: auto;
    right: 0;
  }
`;

export const ModalDropdownBox = styled.div`
  position: absolute;
  top: 110%;
  right: 0;
  width: 100%;
  min-width: 100%;
  max-width: 100%;
  background: ${(props) => props?.theme?.colors?.newtralLightest};
  border: 1px solid ${(props) => props?.theme?.colors?.newtral};
  box-shadow: ${(props) => props?.theme?.shadow?.largeShadow};
  border-radius: ${(props) => props?.theme?.radius?.normalRadius};
  overflow: hidden;
  z-index: 1000;

  &.align-left {
    left: auto;
    right: 0;
  }
`;

export const ModalDropdownBorder = styled.div`
  position: absolute;
  padding: 12px;
  top: 110%;
  right: 0;
  width: 100%;
  min-width: 100%;
  max-width: 100%;
  background: ${(props) => props?.theme?.colors?.newtralLightest};
  box-shadow: ${(props) => props?.theme?.shadow?.largeShadow};
  border: 1px solid ${(props) => props?.theme?.colors?.newtral};
  border-radius: ${(props) => props?.theme?.radius?.normalRadius};
  overflow: hidden;
  z-index: 1000;

  &.align-left {
    left: auto;
    right: 0;
  }
`;

export const ModalFilterWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const ModalInput = styled.input`
  width: 100%;
  padding: 8px 16px;
  height: 39px;
  border-radius: ${(props) => props?.theme?.radius?.normalRadius};
  font-size: ${(props) => props?.theme?.fontSize?.base};
  line-height: 23px;
  color: ${(props) => props?.theme?.colors?.newtralDark};
  border: 1px solid ${(props) => props?.theme?.colors?.newtralDarker};
  background: ${(props) => props?.theme?.colors?.newtralLightest};
  cursor: pointer;
  display: flex;
`;

export const DropdownItem = styled.div`
  padding: 12px;
  font-size: ${(props) => props?.theme?.fontSize?.base};
  line-height: 23px;
  font-weight: ${(props) => props?.theme?.fontWeight?.regular};
  cursor: pointer;
  white-space: normal;
  word-break: break-word;
  overflow-wrap: break-word;

  &:hover {
    background-color: ${(props) => props?.theme?.colors?.newtralLighter};
  }
`;

export const DropdownBorder = styled.div`
  padding: 6px 12px;
  font-size: ${(props) => props?.theme?.fontSize?.base};
  line-height: 23px;
  font-weight: ${(props) => props?.theme?.fontWeight?.regular};
  cursor: pointer;
  white-space: normal;
  word-break: break-word;
  overflow-wrap: break-word;
  display: flex;
  gap: 5px;

  &:hover {
    background-color: ${(props) => props?.theme?.colors?.newtralLighter};
  }
`;

export const FilterWrapper = styled.div`
  position: relative;
  display: inline-block;
  flex: 1;
`;

export const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const ModalContentFilter = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  max-height: 400px;
  overflow-y: auto;
`;

export const ModalLabel = styled.label`
  font-weight: ${(props) => props?.theme?.fontWeight?.medium};
  font-size: ${(props) => props?.theme?.fontSize?.base};
`;

export const ModalFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  padding-top: 16px;
`;

export const SaveButton = styled.button`
  background-color: ${(props) => props?.theme?.colors?.secondary};
  color: ${(props) => props?.theme?.colors?.newtralLightest};
  padding: 8px 20px;
  border-radius: ${(props) => props?.theme?.radius?.normalRadius};
  font-weight: ${(props) => props?.theme?.fontWeight?.medium};
  border: none;
  cursor: pointer;

  &:hover {
    background-color: ${(props) => props?.theme?.colors?.secondaryDark};
  }
`;

export const FilterBox = styled.div<{ isOpen: boolean }>`
  border: 1px solid ${(props) => props?.theme?.colors?.newtral};
  padding: 8px;
  border-radius: ${(props) => props?.theme?.radius?.normalRadius};
  height: 410px;
  display: flex;
  justify-content: center;
  align-items: ${({ isOpen }) => (isOpen ? 'flex-start' : 'center')};
`;

export const NewFilterButton = styled.button`
  background-color: ${(props) => props?.theme?.colors?.primary};
  color: ${(props) => props?.theme?.colors?.newtralLightest};
  padding: 12px 24px;
  border-radius: ${(props) => props?.theme?.radius?.normalRadius};
  font-weight: ${(props) => props?.theme?.fontWeight?.semiBold};
  font-size: ${(props) => props?.theme?.fontSize?.base};
  border: none;
  cursor: pointer;

  &:before {
    content: '+ ';
    margin-right: 4px;
  }
`;

export const FilterDropdown = styled.div`
  border-radius: ${(props) => props?.theme?.radius?.normalRadius};
  background: ${(props) => props?.theme?.colors?.newtralLightest};
  width: 100%;
`;

export const FilterSearchInput = styled.input`
  width: 100%;
  padding: 8px 12px;
  margin-bottom: 12px;
  border: 1px solid ${(props) => props?.theme?.colors?.newtralDarker};
  border-radius: ${(props) => props?.theme?.radius?.smallRadius};
`;

export const FilterDropdownList = styled.div`
  max-height: 180px;
  overflow-y: auto;
`;

export const FilterDropdownItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  border-radius: ${(props) => props?.theme?.radius?.smallRadius};
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background: ${(props) => props?.theme?.colors?.newtralLighter};
  }
`;

export const SearchWrapper = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid ${(props) => props?.theme?.colors?.newtral};
  border-radius: ${(props) => props?.theme?.radius?.normalRadius};
  padding: 8px 12px;
  background-color: ${(props) => props?.theme?.colors?.newtralLightest};
`;

export const SearchIconDropdown = styled.div`
  margin-right: 10px;
  display: flex;
  align-items: center;

  img,
  svg {
    width: 16px;
    position: relative;
    top: -2px;
  }
`;

export const SearchInputDropdown = styled.input`
  border: none;
  outline: none;
  width: 100%;
  font-size: ${(props) => props?.theme?.fontSize?.base};
  color: ${(props) => props?.theme?.colors?.primary};

  &::placeholder {
    color: ${(props) => props?.theme?.colors?.newtralDark};
  }
`;

export const ConditionSearchWrapper = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid ${(props) => props?.theme?.colors?.newtral};
  border-radius: ${(props) => props?.theme?.radius?.normalRadius};
  padding: 8px 12px;
  background-color: ${(props) => props?.theme?.colors?.newtralLightest};
`;

export const ConditionSearchIcon = styled.div`
  margin-right: 10px;
  display: flex;
  align-items: center;

  img,
  svg {
    width: 16px;
    height: 16px;
    position: relative;
    top: -2px;
  }
`;

export const ConditionSearchBox = styled.div`
  padding: 12px;
`;

export const ConditionSearchInput = styled.input`
  border: none;
  outline: none;
  width: 100%;
  font-size: ${(props) => props?.theme?.fontSize?.base};
  color: ${(props) => props?.theme?.colors?.primary};

  &::placeholder {
    color: ${(props) => props?.theme?.colors?.newtralDark};
  }
`;

export const NestedFilterBox = styled.div`
  position: relative;
  border: 1px solid ${(props) => props?.theme?.colors?.newtral};
  border-radius: ${(props) => props?.theme?.radius?.normalRadius};
  padding: 16px;
  background-color: ${(props) => props?.theme?.colors?.newtralLightest};
  box-shadow: ${(props) => props?.theme?.shadow?.smallShadow};
`;

export const FilterLabel = styled.div`
  font-size: ${(props) => props?.theme?.fontSize?.base};
  font-weight: ${(props) => props?.theme?.fontWeight?.semiBold};
  margin-bottom: 12px;
  color: ${(props) => props?.theme?.colors?.primary};
`;

export const FilterDropdownBox = styled.div`
  position: absolute;
  top: 42px;
  right: 0;
  left: auto;
  background: ${(props) => props?.theme?.colors?.newtralLightest};
  border: 1px solid ${(props) => props?.theme?.colors?.newtral};
  border-radius: ${(props) => props?.theme?.radius?.mediumRadius};
  box-shadow: ${(props) => props?.theme?.shadow?.normalShadow};
  z-index: 10;
  min-width: 220px;
  max-width: 260px;
  padding: 16px 14px;
`;

export const FilterRadioLabel = styled.label<{ selected?: boolean }>`
  display: flex;
  align-items: center;
  margin-bottom: 14px;
  font-weight: ${(props) =>
    props?.selected
      ? props?.theme?.fontWeight?.semiBold
      : props?.theme?.fontWeight?.semiBold};
  font-size: ${(props) => props?.theme?.fontSize?.base};
  cursor: pointer;
  color: ${(props) => props?.theme?.colors?.primary};

  input[type='radio'] {
    appearance: none;
    -webkit-appearance: none;
    width: 20px;
    height: 20px;
    margin-right: 10px;
    border: 2px solid
      ${(props) =>
        props?.selected
          ? props?.theme?.colors?.borderDark
          : props?.theme?.colors?.newtralDark};
    border-radius: 50%;
    background-color: ${(props) => props?.theme?.colors?.newtralLightest};
    position: relative;
  }

  input[type='radio']::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 10px;
    height: 10px;
    transform: translate(-50%, -50%);
    background-color: ${(props) => props?.theme?.colors?.borderDark};
    border-radius: 50%;
    display: ${(props) => (props?.selected ? 'block' : 'none')};
  }
`;

export const NewCustomFilterButton = styled.button`
  width: 100%;
  background: ${(props) => props?.theme?.colors?.secondary};
  color: ${(props) => props?.theme?.colors?.newtralLightest};
  border: none;
  border-radius: ${(props) => props?.theme?.radius?.normalRadius};
  padding: 12px 0;
  cursor: pointer;
  font-weight: ${(props) => props?.theme?.fontWeight?.semiBold};
  font-size: ${(props) => props?.theme?.fontSize?.md};
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
`;

export const NewLine = styled.div`
  border-top: 1px dashed ${(props) => props?.theme?.colors?.newtralDarker};
  margin: 16px 0;
`;

export const DistanceBox = styled.div`
  margin: 16px 0;
`;

export const FilterRef = styled.div`
  position: relative;
  display: inline-block;
`;

export const ModalWrapper = styled.div`
  display: flex;
  gap: 8px;
  justify-content: space-between;
  width: 100%;
  align-items: center;
  margin-bottom: 12px;

  span {
    display: flex;
    gap: 5px;
    align-items: center;
  }
`;

export const InputWrapperAdd = styled.div`
  width: 100%;
  padding: 8px 16px;
  height: 39px;
  border-radius: ${(props) => props?.theme?.radius?.normalRadius};
  font-size: ${(props) => props?.theme?.fontSize?.base};
  line-height: 23px;
  color: ${(props) => props?.theme?.colors?.newtralDark};
  border: 1px solid ${(props) => props?.theme?.colors?.newtralDarker};
  background: ${(props) => props?.theme?.colors?.newtralLightest};
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 8px;
`;

export const CloseIconWrapper = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  margin-left: 8px;
  cursor: pointer;
`;

export const ModalInputCustom = styled.input`
  border: none;
  outline: none;
  width: 100%;
  font-size: ${(props) => props?.theme?.fontSize?.base};
  color: ${(props) => props?.theme?.colors?.newtralDark};
  background: transparent;
`;

export const CloseIconImg = styled.img`
  width: 20px;
  height: 20px;
`;

export const FilterLabelClearWrapper = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
`;

export const AddConditionWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 16px;
`;

export const ConditionDropdownWrapper = styled.div`
  position: relative;
  width: 100%;
`;

export const LabelDropdownWrapper = styled.div`
  position: relative;
  width: 100%;
`;

export const MainFilterDropdownWrapper = styled.div`
  position: relative;
  width: 100%;
`;

export const ConversationListWrapper = styled.div`
  flex: 1;
  overflow-y: auto;
  min-height: 0;
`;

export const LoadingMore = styled.div`
  text-align: center;
  padding: 16px;
  color: ${(props) => props.theme.colors.primary};
`;

export const AllDataLoaded = styled.div`
  text-align: center;
  padding: 16px;
  color: #888;
`;
