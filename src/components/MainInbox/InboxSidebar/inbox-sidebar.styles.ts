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

export const DataRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const DataLabel = styled.div`
  font-size: 12px;
  color: #888;
  width: 60px;
`;

export const DataValue = styled.div`
  font-size: 12px;
  padding: 8px;
  border-radius: 8px;
  color: #333;
  flex: 1;
  border: 1px solid #e8e8e8;
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
`;

export const EmailRow = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
`;

export const AvatarWrapper = styled.div`
  position: relative;
  width: 64px;
  height: 64px;
`;

export const Avatar = styled.img`
  width: 100%;
  height: 100%;
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
  bottom: -2px;
  right: -2px;
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
