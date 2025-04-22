import styled from "styled-components";

export const Container = styled.div`
  width: 320px;
  background: #fff;
  border-left: 1px solid #eee;
  padding: 16px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const ViewProfile = styled.div`
  color: #007bff;
  font-size: 12px;
  font-weight: 600;
  margin-top: 8px;
  cursor: pointer;
`;

export const Section = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const SectionHeader = styled.div`
  font-weight: 600;
  height: 36px;
  font-size: 14px;
  background: #f5f5f5;
  padding: 8px;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const SectionContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

export const Field = styled.div`
  font-size: 14px;
  font-weight: 400;
  line-height: 23px;
  color: #333;

  img,
  svg {
    width: 20px;
    height: 20px;
    padding-right: 5px;
  }
`;

export const Participant = styled.div`
  font-size: 13px;
  color: #333;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const AddLink = styled.span`
  color: #007bff;
  font-size: 12px;
  cursor: pointer;
`;

export const DataWidth = styled.div`
  width: 100px;
`;

export const DataRow = styled.div`
  display: flex;
  justify-content: center;
  cursor: pointer;
  align-items: center;
  gap: 8px;
`;

export const DataLabel = styled.div`
  font-size: 12px;
  color: #888;
  width: 60px;
`;

export const DataLinkWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
`;

export const LinkText = styled.div`
  color: #3750b2;
  text-decoration: underline;
  cursor: pointer;
`;

export const LinkActionIcons = styled.div`
  position: absolute;
  right: 8px;
  display: none;
  gap: 4px;
  align-items: center;

  img {
    width: 16px;
    height: 16px;
    cursor: pointer;
  }
`;

export const DataValue = styled.div`
  font-size: 12px;
  padding: 8px;
  border-radius: 8px;
  color: #333;
  flex: 1;
  border: 1px solid #e8e8e8;
  position: relative;

  &:hover ${LinkActionIcons} {
    display: flex;
  }
`;

export const AddButton = styled.div`
  background: #eef2f8;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  cursor: pointer;
`;

export const ProfileSection = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  position: relative;
`;

export const ActionIcons = styled.div`
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  display: none;
  gap: 8px;

  img {
    width: 20px;
    height: 20px;
    cursor: pointer;
  }
`;

export const HoverArea = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  width: 100px;
  cursor: pointer;

  &:hover ${ActionIcons} {
    display: flex;
  }
`;

export const EmailRow = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
`;

export const AvatarWrapper = styled.div`
  position: relative;
  cursor: pointer;
`;

export const Avatar = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
`;

export const FlagIcon = styled.img`
  position: absolute;
  top: -4px;
  left: -4px;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 2px solid #fff;
  background: #fff;
`;

export const Status = styled.div<{ online?: boolean }>`
  position: absolute;
  right: -2px;
  top: 26px;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: ${({ online }) => (online ? "#4CAF50" : "#ccc")};
  border: 2px solid #fff;
`;

export const ProfileInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const NameRow = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
`;

export const Name = styled.div`
  font-weight: 600;
  font-size: 14px;
  line-height: 23px;
`;

export const Email = styled.div`
  font-size: 12px;
  color: #5c5c5c;
  font-weight: 400;
  line-height: 20px;
`;

export const CollapseIcon = styled.span<{ isOpen: boolean }>`
  margin-left: auto;
  transition: transform 0.2s ease;
  transform: rotate(${({ isOpen }) => (isOpen ? "0deg" : "180deg")});
  font-size: 12px;
`;

export const CountryRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const countryCenter = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: #3750b2;
  font-size: 14px;
  font-weight: 600;
  line-height: 23px;
`;

export const CountryFlag = styled.img`
  width: 30px !important;
  height: 14px;
  object-fit: cover;
  border-radius: 2px;
`;

// dropdown

export const DropdownWrapper = styled.div`
  position: relative;
  width: 100%;
  font-size: 14px;
`;

export const DropdownHeader = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background: #fff;
  cursor: pointer;
`;

export const UserIcon = styled.span`
  margin-right: 8px;
  font-size: 16px;
`;

export const DropdownRow = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: start;
  gap: 5px;
`;

export const ArrowIcon = styled.span<{ isOpen: boolean }>`
  margin-left: auto;
  font-size: 12px;
  transform: rotate(${({ isOpen }) => (isOpen ? "180deg" : "0deg")});
  transition: transform 0.2s ease;
`;

export const DropdownList = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  margin-top: 4px;
  overflow: hidden;
  z-index: 10;
`;

export const DropdownItem = styled.div<{ selected?: boolean }>`
  padding: 8px 12px;
  background: ${({ selected }) => (selected ? "#f0f0f0" : "#fff")};
  cursor: pointer;

  &:hover {
    background: #f5f5f5;
  }
`;

// tag

export const TagsWrapper = styled.div`
  display: flex;
  padding: 8px;
  border-radius: 8px;
  align-items: center;
  flex-wrap: wrap;
  gap: 6px;
  position: relative;
  border: 1px solid #e8e8e8;
`;

export const Tag = styled.div`
  display: flex;
  align-items: center;
  background: #eef2f8;
  padding: 4px 8px;
  border-radius: 8px;
  font-size: 12px;
  color: #333;
`;

export const RemoveTagButton = styled.button`
  background: none;
  border: none;
  color: #666;
  margin-left: 4px;
  cursor: pointer;
  font-size: 12px;
`;

export const ClearAllButton = styled.button`
  background: none;
  border: none;
  color: #666;
  cursor: pointer;
  font-size: 16px;
  margin-left: auto;
`;

export const TooltipContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const CustomTooltip = styled.div`
  position: absolute;
  bottom: -66px;
  left: 200%;
  transform: translateX(-50%);
  background: #333333;
  padding: 12px 16px;
  border-radius: 12px;
  display: none;
  z-index: 1000;
  min-width: 180px;

  &::before {
    content: "";
    position: absolute;
    top: -8px;
    left: 20px;
    width: 0;
    height: 0;
    border-left: 8px solid transparent;
    border-right: 8px solid transparent;
    border-bottom: 8px solid #333333;
  }

  ${AvatarWrapper}:hover & {
    display: block;
  }
`;

export const TooltipStatus = styled.div`
  color: #ffffff;
  font-size: 12px;
  line-height: 20px;
  line-height: 1.4;
  font-weight: 500;
`;

export const TooltipLastActive = styled.div`
  color: #ffffff;
  line-height: 20px;
  font-size: 12px;
  font-style: italic;
  line-height: 1.4;
  opacity: 0.9;
`;
