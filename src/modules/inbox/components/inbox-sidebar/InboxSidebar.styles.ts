import styled from 'styled-components';

export const Container = styled.div`
  width: 420px;
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
  transform: rotate(${({ isOpen }) => (isOpen ? '0deg' : '180deg')});
  font-size: 12px;
`;

export const CountryRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const countryCenter = styled.div`
  display: flex;
  cursor: pointer;
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
  transform: rotate(${({ isOpen }) => (isOpen ? '180deg' : '0deg')});
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
  background: ${({ selected }) => (selected ? '#f0f0f0' : '#fff')};
  cursor: pointer;

  &:hover {
    background: #f5f5f5;
  }
`;

export const TagsWrapper = styled.div`
  display: flex;
  height: 32px;
  padding: 0 8px;
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

export const PanelWrapper = styled.div`
  background: white;
  border-radius: 10px;
`;

export const PanelHeader = styled.div`
  display: flex;
  gap: 12px;
  margin-bottom: 16px;
`;

export const UserAvatar = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 50%;
`;

export const UserDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

export const UserName = styled.h2`
  margin: 0;
  font-size: 18px;
`;

export const UserEmail = styled.span`
  font-size: 14px;
  color: #666;
`;

export const UserMeta = styled.div`
  font-size: 14px;
  line-height: 23px;
  font-weight: 400;
  color: #8a8a8a;
`;

export const PanelSection = styled.div`
  margin-top: 20px;
  padding: 12px;
  border-radius: 8px;
  border: 1px solid #eee;
`;

export const SectionHeading = styled.p`
  font-size: 14px;
  color: #333;
  margin-bottom: 8px;
  border-bottom: 1px solid #eee;
  padding-bottom: 4px;

  display: flex;
  justify-content: space-between;
`;

export const SectionW = styled.div`
  width: 100%;
`;

export const SectionCompan = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
`;

export const SectionWidth = styled.div`
  display: flex;
  color: #3750b2;
  align-items: center;
  font-weight: 600;
  gap: 5px;
`;

export const SectionButton = styled.div`
  display: flex;
  align-items: center;
  color: #3750b2;
  font-weight: 600;
  cursor: pointer;
  gap: 5px;
`;

export const DetailRow = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  margin-bottom: 6px;
`;

export const DetailLabel = styled.span`
  color: #555;
`;

export const DetailValue = styled.span`
  font-size: 14px;
  color: #253a8e;
  line-height: 23px;
  font-weight: 400;
`;

export const BrowserDetails = styled.span`
  margin-right: 4px;
`;

export const NoteBox = styled.div`
  background-color: #fff5d1;
  padding: 10px;
  border-radius: 8px;
  font-size: 14px;
  line-height: 1.4;
`;

export const TagsContainer = styled.div`
  display: flex;
  gap: 8px;
`;

export const PanelColumn = styled.div`
  display: flex;
  padding-left: 10px;
  width: 100%;
  justify-content: space-between;
  align-items: center;
`;

export const PanelItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: end;
`;

export const PanelP = styled.p`
  font-size: 14px;
  line-height: 23px;
  color: #333333;
  font-weight: 400;
`;

export const TagItem = styled.span`
  background-color: #eef2f7;
  color: #333;
  padding: 4px 8px;
  font-size: 12px;
  border-radius: 6px;
`;

export const SectionCompoint = styled.div`
  border: 1px solid #eee;
  padding: 10px;
  border-radius: 8px;

  display: flex;
  flex-direction: column;
  width: 190px;
`;

export const SectionCompanTitle = styled.div`
  font-size: 14px;
  padding-bottom: 5px;
  line-height: 23px;
  font-weight: 400;
  border-bottom: 1px solid #eee;
`;

export const SectionCompanTime = styled.div`
  font-size: 20px;
  line-height: 32px;
  font-weight: 600;
  display: flex;
  justify-content: end;
  color: #3750b2;
`;

export const SectionRowInfor = styled.div`
  display: flex;
  padding-top: 9px;
  justify-content: space-between;
`;

export const SectionCompointRight = styled.div`
  border: 1px solid #eee;
  padding: 10px;
  border-radius: 8px;

  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const SectionChormeChild = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;

  font-size: 14px;
  line-height: 23px;
  font-weight: 400;
`;

export const SectionIPp = styled.p`
  font-size: 12px;
  line-height: 23px;
  font-weight: 400;
`;

export const SectionDeColumn = styled.div`
  display: flex;
  flex-direction: column;
`;

export const SectionCloudRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const SectionCloudOne = styled.div`
  display: flex;
  gap: 5px;
  align-items: center;

  font-size: 14px;
  line-height: 23px;
  font-weight: 400;
  margin-top: 5px;
  color: #333333;
`;

export const SectionCloudTwo = styled.div`
  display: flex;
  gap: 5px;
  align-items: center;

  font-size: 14px;
  line-height: 23px;
  font-weight: 400;
  margin-top: 5px;
  color: #8a8a8a;
`;

export const LastSection = styled.div`
  display: flex;
  gap: 25px;
  align-items: center;
`;

export const LastSectionp = styled.div`
  font-size: 14px;
  line-height: 23px;
  font-weight: 400;
  color: #333333;
  width: 100%;

  span {
    color: #8a8a8a;
  }
`;

export const LastSectionLeft = styled.div`
  font-size: 14px;
  line-height: 23px;
  font-weight: 400;
  color: #333333;
  width: 120px;
`;

export const LastSectionImage = styled.div`
  position: relative;
  left: -24px;
`;

export const CompanyRow = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  width: 100%;
`;

export const CompanyP = styled.p`
  font-size: 14px;
  line-height: 23px;
  font-weight: 400;
  padding-top: 5px;
`;

export const CompanyColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
  width: 100% !important;
`;

export const PanelSectionEnd = styled.div`
  margin-top: 20px;
  padding: 12px;
  border-radius: 8px;
  border: 1px solid #eee;
  width: 300px;
  height: 247px;
`;

export const PanelSectionColumn = styled.div`
  padding: 12px;
  border-radius: 8px;
  border: 1px solid #eee;
  background-color: #fef1d7;
  height: 149px;
`;

export const PanelSectionNotepad = styled.div`
  margin-top: 20px;
  height: 247px;
`;

export const ParticipantP = styled.p`
  font-size: 14px;
  line-height: 23px;
  font-weight: 400;
  color: #333333;

  span {
    color: red;
  }
`;

export const ParticipantInput = styled.input`
  width: 100%;
  padding: 12px;
  border-radius: 8px;
  border: 1px solid #e8e8e8;
  margin-bottom: 32px;
  font-size: 16px;
`;

export const QuickJumpDropdownText = styled.div`
  font-size: 16px;
  color: #b3b3b3;
  font-style: italic;
  margin-left: 32px;
  margin-bottom: 8px;
`;
