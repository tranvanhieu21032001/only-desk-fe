import { Image } from 'antd';
import { useTranslation } from 'react-i18next';
import AvatarWithStatus from '@/shared/components/common/Avatar';


import * as S from '../InboxSidebar.styles';
import chorme from '@/assets/icons/common/ic-chorme.svg';
import defaultAvatar from '@/assets/images/avatar-default.png';
import flag from '@/assets/icons/common/ic-flag.svg';
import chatBlue from '@/assets/icons/common/ic-chat-blue.svg';
import badge from '@/assets/icons/common/ic-badge.svg';
import addBlue from '@/assets/icons/common/ic-add-blue.svg';
import earthBlue from '@/assets/icons/common/ic-earth-blue.svg';
import locationBlue from '@/assets/icons/common/ic-locaion-blue.svg';
import cloudBlue from '@/assets/icons/common/ic-cloud-blue.svg';
import screen from '@/assets/icons/common/ic-screen.svg';
import flagAmerica from '@/assets/icons/common/ic-flag-america.svg';
import company from '@/assets/icons/common/ic-company.svg';
import noteBlue from '@/assets/icons/common/ic-note-blue.svg';
import tagsBlue from '@/assets/icons/common/ic-tags-blue.svg';
import ProfilePreviewModal from '../../profile-preview-modal/ProfilePreviewModal';
interface UserProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const UserProfileModal: React.FC<UserProfileModalProps> = ({ isOpen, onClose }) => {
  const { t } = useTranslation();

  return (
    <ProfilePreviewModal isOpen={isOpen} onClose={onClose}>
      <S.PanelWrapper>
        {/* Header */}
        <S.PanelHeader>
          <S.PanelColumn>
            <S.ProfileSection>
              <AvatarWithStatus
                avatarSrc={defaultAvatar}
                flagSrc={flag}
                isOnline={true}
              />
              <S.ProfileInfo>
                <S.NameRow>
                  <S.Name>Sophia Williams</S.Name>
                </S.NameRow>
                <S.Email>sophia@alignui.com</S.Email>
              </S.ProfileInfo>
            </S.ProfileSection>

            <S.PanelItem>
              <S.PanelP>{t('inboxSidebar.createdDate')}: 19/04/2024</S.PanelP>
              <S.PanelP>{t('inboxSidebar.lastActive')}: 5 hour ago</S.PanelP>
            </S.PanelItem>
          </S.PanelColumn>
        </S.PanelHeader>

        {/* Conversation */}
        <S.PanelSection>
          <S.SectionHeading>
            <S.SectionWidth>
              <Image src={chatBlue} preview={false} />
              Conversation
              <Image src={badge} preview={false} />
            </S.SectionWidth>

            <S.SectionButton>
              <Image src={addBlue} preview={false} />
              New Conversation
            </S.SectionButton>
          </S.SectionHeading>

          <S.SectionCompan>
            <AvatarWithStatus
              avatarSrc={defaultAvatar}
              flagSrc={flag}
              isOnline={true}
            />
            <S.SectionW>
              <S.DetailRow>
                <S.DetailValue>Admin 3</S.DetailValue>
                <S.UserMeta>10m</S.UserMeta>
              </S.DetailRow>
              <S.UserMeta>John Smith submitted web form</S.UserMeta>
            </S.SectionW>
          </S.SectionCompan>
        </S.PanelSection>

        {/* Page */}
        <S.PanelSection>
          <S.SectionHeading>
            <S.SectionWidth>
              <Image src={earthBlue} preview={false} />
              Page Visited Recently
            </S.SectionWidth>
          </S.SectionHeading>

          <div>
            <S.SectionCompan>
              <S.SectionCompoint>
                <S.SectionCompanTitle>Time on website</S.SectionCompanTitle>
                <S.SectionCompanTime>3s</S.SectionCompanTime>
              </S.SectionCompoint>

              <S.SectionCompointRight>
                <S.SectionCompanTitle>Device information</S.SectionCompanTitle>
                <S.SectionRowInfor>
                  <S.SectionChormeChild>
                    <Image src={chorme} preview={false} />
                    Chrome on Win10
                  </S.SectionChormeChild>
                  <S.SectionIPp>2001:ee0:4b49:2e80::</S.SectionIPp>
                </S.SectionRowInfor>
              </S.SectionCompointRight>
            </S.SectionCompan>

            {[1, 2].map((item) => (
              <S.SectionCloudRow key={item}>
                <S.SectionCloudOne>
                  <Image src={cloudBlue} preview={false} />
                  MyBlog - Just another WordPress site
                </S.SectionCloudOne>

                <S.SectionCloudTwo>
                  6 hour ago
                  <Image src={screen} preview={false} />
                </S.SectionCloudTwo>
              </S.SectionCloudRow>
            ))}
          </div>
        </S.PanelSection>

        {/* Last Location */}
        <S.PanelSection>
          <S.SectionHeading>
            <S.SectionWidth>
              <Image src={locationBlue} preview={false} />
              Last Reported Location
            </S.SectionWidth>
          </S.SectionHeading>

          <S.LastSection>
            <S.LastSectionLeft>City, country</S.LastSectionLeft>
            <S.LastSectionp>Da Nang, Vietnam</S.LastSectionp>
          </S.LastSection>

          <S.LastSection>
            <S.LastSectionLeft>Local time</S.LastSectionLeft>
            <S.LastSectionp>2:34pm <span>(UTC +7)</span></S.LastSectionp>
          </S.LastSection>

          <S.LastSection>
            <S.LastSectionLeft>Languages</S.LastSectionLeft>
            <S.LastSectionImage>
              <Image src={flagAmerica} preview={false} />
            </S.LastSectionImage>
          </S.LastSection>
        </S.PanelSection>

        {/* Company Info */}
        <S.CompanyRow>
          <S.PanelSectionEnd>
            <S.SectionHeading>
              <S.SectionWidth>
                <Image src={company} preview={false} />
                Company
              </S.SectionWidth>
            </S.SectionHeading>

            <S.CompanyP>Company</S.CompanyP>
            <S.CompanyP>Job Title</S.CompanyP>
            <S.CompanyP>Job Role</S.CompanyP>
            <S.CompanyP>Website</S.CompanyP>
            <S.CompanyP>City</S.CompanyP>
            <S.CompanyP>Country</S.CompanyP>
            <S.CompanyP>Employees</S.CompanyP>
          </S.PanelSectionEnd>

          <S.PanelSectionNotepad>
            <S.PanelSectionColumn>
              <S.SectionHeading>
                <S.SectionWidth>
                  <Image src={noteBlue} preview={false} />
                  Private Notepad
                </S.SectionWidth>
              </S.SectionHeading>

              <S.NoteBox>
                This is a note. This is a note. This is a note. This is a note.
              </S.NoteBox>
            </S.PanelSectionColumn>

            <S.PanelSection>
              <S.SectionHeading>
                <S.SectionWidth>
                  <Image src={tagsBlue} preview={false} />
                  Segments
                </S.SectionWidth>
              </S.SectionHeading>

              <S.TagsContainer>
                <S.TagItem>Tag</S.TagItem>
                <S.TagItem>Tag</S.TagItem>
                <S.TagItem>Tag</S.TagItem>
              </S.TagsContainer>
            </S.PanelSection>
          </S.PanelSectionNotepad>
        </S.CompanyRow>
      </S.PanelWrapper>
    </ProfilePreviewModal>
  );
};

export default UserProfileModal;
