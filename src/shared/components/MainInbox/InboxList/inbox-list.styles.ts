import styled from "styled-components";

export const Container = styled.div`
  padding: 12px;
  width: 400px;
  background-color: #fff;
  overflow-y: auto;
  border-top-left-radius: 8px;
  border-bottom-left-radius: 8px;
`;

export const SearchFilterWrapper = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
  align-items: center;
  width: 100%;
`;

export const SearchInputWrapper = styled.div`
  flex-grow: 1;
  min-width: 0;
  height: 39px;
  display: flex;
  align-items: center;
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 0 12px;
  background-color: white;
  gap: 8px;
`;

export const SearchInput = styled.input`
  flex: 1;
  border: none;
  outline: none;
  background: transparent;
  font-size: 14px;
  min-width: 0;
`;

export const SearchIcon = styled.div`
  width: 20px;
  height: 20px;
  flex-shrink: 0;
`;

export const Button = styled.button`
  flex-shrink: 0;
  width: max-content;
  padding: 8px 16px;
  height: 39px;
  border-radius: 8px;
  font-size: 14px;
  line-height: 23px;
  color: #333;
  border: 1px solid #ccc;
  background: white;
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
  border-radius: 8px;
  font-size: 14px;
  line-height: 23px;
  color: #333;
  border: 1px solid #ccc;
  background: white;
  cursor: pointer;

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
  border-radius: 12px;
  margin-bottom: 12px;
  cursor: pointer;

  &:hover {
    background-color: #fafafa;
  }
`;

export const Avatar = styled.div`
  margin-right: 12px;
`;

export const Content = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

export const Title = styled.div`
  font-size: 14px;
  line-height: 23px;
  font-weight: 600;
`;

export const Subtitle = styled.div`
  color: #8a8a8a;
  line-height: 23px;
  font-weight: 400;
  font-size: 14px;
`;

export const RightSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  position: relative;
  min-width: 50px;
`;

export const Time = styled.div`
  color: #999;
  font-weight: 400;
  line-height: 20px;
  font-size: 12px;

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
  background-color: #d91f11;
  color: #fff;
  font-size: 12px;
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
  background: #fafafa;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  display: ${({ isOpen }) => (isOpen ? "block" : "none")};
  z-index: 1000;
  min-width: 200px;
  padding: 8px 0;
`;

export const MenuItem = styled.div`
  display: flex;
  align-items: center;
  padding: 8px 16px;
  font-size: 14px;
  color: #333;
  cursor: pointer;
  gap: 8px;

  img {
    width: 16px;
    height: 16px;
  }

  &.delete {
    color: #ff4d4f;
  }
`;

export const AllDropdown = styled.div`
  position: absolute;
  top: 120%;
  right: 0;
  width: 200px;
  background: white;
  box-shadow: 0 4px 10px rgba(0,0,0,0.1);
  border-radius: 8px;
  overflow: hidden;
  z-index: 1000;

  &.align-left {
    left: auto;
    right: 0;
  }
`;

export const DropdownItem = styled.div`
  padding: 12px;
  font-size: 14px;
  line-height: 23px;
  font-weight: 400;
  cursor: pointer;
  white-space: normal; 
  word-break: break-word;
  overflow-wrap: break-word;

  &:hover {
    background-color: #f5f5f5;
  }
`;

export const FilterWrapper = styled.div`
  position: relative;
  display: inline-block;
  flex: 1;
`;

