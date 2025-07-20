import { Image } from 'antd';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import ProfilePreviewModal from '../profile-preview-modal/ProfilePreviewModal';
import Modal from '@/shared/components/common/Modal';
import Button from '@/shared/components/common/Button';
import Collapse from '@/shared/components/common/Collapse';
import AvatarWithStatus from '@/shared/components/common/Avatar';

import { initialTags } from '@/core/settings/options';

import * as S from './InboxSidebar.styles';

import verify from '@/assets/icons/common/ic-verify.svg';
import flag from '@/assets/icons/common/ic-flag.svg';
import defaultAvatar from '@/assets/images/avatar-default.png';
import flagVietNam from '@/assets/images/flag-vietnamese.png';
import location from '@/assets/icons/common/ic-location.svg';
import time from '@/assets/icons/common/ic-time.svg';
import internet from '@/assets/icons/common/ic-internet.svg';
import arrDown from '@/assets/icons/common/ic-arrow-down.svg';
import userCheck from '@/assets/icons/common/ic-user-check.svg';
import chorme from '@/assets/icons/common/ic-chorme.svg';
import cloud from '@/assets/icons/common/ic-cloud.svg';
import image from '@/assets/icons/common/ic-image.svg';
import mailInfo from '@/assets/icons/common/ic-mail-info.svg';
import message from '@/assets/icons/common/ic-message-info.svg';
import copy from '@/assets/icons/common/ic-copy.svg';
import edit from '@/assets/icons/common/ic-edit.svg';
import close from '@/assets/icons/common/ic-close-circle.svg';
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
import userPlus from '@/assets/icons/inbox/ic-user-plus.svg';
import closeRed from '@/assets/icons/inbox/ic-close-red.svg';
import add from '@/assets/icons/inbox/ic-add.svg';
import ProfileCard from '@/shared/components/common/ProfileCard';
import { useAppSelector } from '@/shared/hooks';

const InboxSidebar = () => {
  const { t } = useTranslation('inbox');
  const [openCollapse] = useState(true);
  const [selected, setSelected] = useState('None assigned');
  const [openDropdown, setOpenDropdown] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [tags, setTags] = useState(initialTags);
  const [isAddParticipantModalOpen, setIsAddParticipantModalOpen] =
    useState(false);
  const [participantEmail, setParticipantEmail] = useState('');
  const [participants, setParticipants] = useState<string[]>([]);
  const [openQuickJump, setOpenQuickJump] = useState<{
    image: boolean;
    conversation: boolean;
  }>({ image: false, conversation: false });
  const { selectedConversation } = useAppSelector((state) => state.inbox);

  const handleSelect = (option: string) => {
    setSelected(option);
    setOpenDropdown(false);
  };

  const removeTag = (index: number) => {
    const newTags = tags.filter((_, i) => i !== index);
    setTags(newTags);
  };

  const clearAll = () => {
    setTags([]);
  };

  const options = ['None assigned', 'User 1', 'User 2', 'User 3'];

  const openAddParticipantModal = () => setIsAddParticipantModalOpen(true);
  const closeAddParticipantModal = () => {
    setIsAddParticipantModalOpen(false);
    setParticipantEmail('');
  };

  return (
    <S.Container>
      <ProfileCard
        contactId={selectedConversation?.contact?.id}
        avatarSize={60}
        email={selectedConversation?.contact?.email}
        name={selectedConversation?.contact?.name || ''}
        avatarUrl={selectedConversation?.contact?.avatar}
        countryCode={selectedConversation?.contact?.countryCode}
      />
      {/* <S.ProfileSection>
        <AvatarWithStatus
          avatarSrc={defaultAvatar}
          flagSrc={flag}
          isOnline={true}
          tooltipStatus="Sophia Williams is away"
          tooltipLastActive="Last active: Sep 2025"
        />
        <S.ProfileInfo>
          <S.NameRow>
            <S.Name>Sophia Williams</S.Name>
            <Image src={verify} preview={false} />
          </S.NameRow>
          <S.Email>sophia@alignui.com</S.Email>
        </S.ProfileInfo>
        <S.HoverArea>
          <S.ActionIcons>
            <Image src={copy} preview={false} />
            <Image src={edit} preview={false} />
          </S.ActionIcons>
        </S.HoverArea>
      </S.ProfileSection> */}

      <S.countryCenter onClick={() => setShowModal(true)}>
        {t('inboxSidebar.viewProfile')}
      </S.countryCenter>

      {showModal && (
        <ProfilePreviewModal isOpen={true} onClose={() => setShowModal(false)}>
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

              <div className="">
                <S.SectionCompan>
                  <S.SectionCompoint>
                    <S.SectionCompanTitle>Time on website</S.SectionCompanTitle>
                    <S.SectionCompanTime>3s</S.SectionCompanTime>
                  </S.SectionCompoint>

                  <S.SectionCompointRight>
                    <S.SectionCompanTitle>
                      Device information
                    </S.SectionCompanTitle>
                    <S.SectionRowInfor>
                      <S.SectionChormeChild>
                        <Image src={chorme} preview={false} />
                        Chrome on Win10
                      </S.SectionChormeChild>
                      <S.SectionIPp>2001:ee0:4b49:2e80::</S.SectionIPp>
                    </S.SectionRowInfor>
                  </S.SectionCompointRight>
                </S.SectionCompan>

                <S.SectionCloudRow>
                  <S.SectionCloudOne>
                    <Image src={cloudBlue} preview={false} />
                    MyBlog - Just another WordPress site
                  </S.SectionCloudOne>

                  <S.SectionCloudTwo>
                    6 hour ago
                    <Image src={screen} preview={false} />
                  </S.SectionCloudTwo>
                </S.SectionCloudRow>

                <S.SectionCloudRow>
                  <S.SectionCloudOne>
                    <Image src={cloudBlue} preview={false} />
                    MyBlog - Just another WordPress site
                  </S.SectionCloudOne>

                  <S.SectionCloudTwo>
                    6 hour ago
                    <Image src={screen} preview={false} />
                  </S.SectionCloudTwo>
                </S.SectionCloudRow>
              </div>
            </S.PanelSection>

            {/* Last */}
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

                <S.LastSectionp>
                  2:34pm <span>(UTC +7)</span>
                </S.LastSectionp>
              </S.LastSection>

              <S.LastSection>
                <S.LastSectionLeft>Languages</S.LastSectionLeft>

                <S.LastSectionImage>
                  <Image src={flagAmerica} preview={false} />
                </S.LastSectionImage>
              </S.LastSection>
            </S.PanelSection>

            {/* Company */}
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
                    This is a note. This is a note. This is a note. This is a
                    note.
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
      )}

      <Collapse title="Main Information">
        <S.DropdownWrapper>
          <S.DropdownRow>
            <S.UserIcon>
              <Image src={userCheck} preview={false} />
            </S.UserIcon>
            <S.DropdownHeader onClick={() => setOpenDropdown(!openDropdown)}>
              <span>{selected}</span>
              <S.ArrowIcon isOpen={openDropdown}>
                <Image src={arrDown} preview={false} />
              </S.ArrowIcon>
            </S.DropdownHeader>
          </S.DropdownRow>

          {openDropdown && (
            <S.DropdownList>
              {options.map((option) => (
                <S.DropdownItem
                  key={option}
                  onClick={() => handleSelect(option)}
                  selected={selected === option}
                >
                  {option}
                </S.DropdownItem>
              ))}
            </S.DropdownList>
          )}
        </S.DropdownWrapper>
      </Collapse>

      <Collapse title="Main Information">
        {openCollapse && (
          <S.SectionContent>
            <S.Field>
              <Image src={location} preview={false} /> Da Nang
            </S.Field>
            <S.Field>
              <Image src={time} preview={false} /> 2:34pm (UTC +7)
            </S.Field>
            <S.Field>
              <S.CountryRow>
                <span>
                  <Image src={internet} preview={false} /> Viet Nam
                </span>
                <S.CountryFlag src={flagVietNam} />
              </S.CountryRow>
            </S.Field>
          </S.SectionContent>
        )}
      </Collapse>

      <Collapse title={t('inboxSidebar.visitorsDevices')}>
        {openCollapse && (
          <S.SectionContent>
            <S.Field>
              <Image src={chorme} preview={false} /> Chrome on Win10
            </S.Field>
            <S.Field>
              <Image src={cloud} preview={false} /> 190:029:29:918:0ee Da Nang Viet...
            </S.Field>
          </S.SectionContent>
        )}
      </Collapse>

      <Collapse title={t('inboxSidebar.conversationParticipants')}>
        {openCollapse && (
          <S.SectionContent>
            <S.Participant>
              <S.DropdownRow>
                <Image src={mailInfo} preview={false} />
                <S.Field>admin@mposs.io</S.Field>
              </S.DropdownRow>
              <S.countryCenter onClick={openAddParticipantModal}>
                {t('add')}
              </S.countryCenter>
            </S.Participant>
            {participants.map((email, idx) => (
              <S.Participant key={email}>
                <S.DropdownRow>
                  <Image src={userPlus} preview={false} />
                  <S.Field>{email}</S.Field>
                </S.DropdownRow>
                <S.countryCenter
                  onClick={() =>
                    setParticipants(participants.filter((_e, i) => i !== idx))
                  }
                >
                  <Image src={closeRed} preview={false} />
                </S.countryCenter>
              </S.Participant>
            ))}
          </S.SectionContent>
        )}
      </Collapse>

      <Modal
        isOpen={isAddParticipantModalOpen}
        onClose={closeAddParticipantModal}
        title={t('inboxSidebar.addParticipantEmail')}
        description={t('newSubInbox.description')}
        width={540}
        footer={
          <>
            <Button
              type="primary"
              iconPosition="left"
              width="170px"
              icon={<img src={add} alt="" />}
              onClick={() => {
                const email = participantEmail.trim();
                if (email && !participants.includes(email)) {
                  setParticipants((prev) => {
                    const updated = [...prev, email];
                    return updated;
                  });
                  closeAddParticipantModal();
                }
              }}
            >
              {t('inboxSidebar.addParticipant')}
            </Button>
          </>
        }
      >
        <S.ParticipantP>
          {t('inboxSidebar.emailAddress')} <span>*</span>
        </S.ParticipantP>
        <S.ParticipantInput
          type="email"
          placeholder={t('inboxSidebar.enterEmailAddress')}
          value={participantEmail}
          onChange={(e) => setParticipantEmail(e.target.value)}
        />
      </Modal>

      <Collapse title={t('inboxSidebar.quickJump')}>
        {openCollapse && (
          <S.SectionContent>
            {/* Shared image files */}
            <S.Field style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }} onClick={() => setOpenQuickJump(prev => ({ ...prev, image: !prev.image }))}>
              <Image src={image} preview={false} /> {t('inboxSidebar.sharedImageFiles')}
              <img
                src={arrDown}
                alt="toggle"
                style={{ marginLeft: 'auto', transform: openQuickJump.image ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }}
              />
            </S.Field>
            {openQuickJump.image && (
              <S.QuickJumpDropdownText>No images were shared.</S.QuickJumpDropdownText>
            )}
            {/* Other conversation */}
            <S.Field style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }} onClick={() => setOpenQuickJump(prev => ({ ...prev, conversation: !prev.conversation }))}>
              <Image src={message} preview={false} /> {t('inboxSidebar.otherConversation')}
              <img
                src={arrDown}
                alt="toggle"
                style={{ marginLeft: 'auto', transform: openQuickJump.conversation ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }}
              />
            </S.Field>
            {openQuickJump.conversation && (
              <S.QuickJumpDropdownText>No images were shared.</S.QuickJumpDropdownText>
            )}
          </S.SectionContent>
        )}
      </Collapse>

      <Collapse title={t('inboxSidebar.segmentForConversation')}>
        {openCollapse && (
          <S.SectionContent>
            <S.TagsWrapper>
              {tags.map((tag, index) => (
                <S.Tag key={index}>
                  {tag}
                  <S.RemoveTagButton onClick={() => removeTag(index)}>
                    ×
                  </S.RemoveTagButton>
                  {/* <img src={removeCircle} alt="" onClick={() => removeTag(index)} /> */}
                </S.Tag>
              ))}
              {tags.length > 0 && (
                <S.ClearAllButton onClick={clearAll}>×</S.ClearAllButton>
              )}
            </S.TagsWrapper>
          </S.SectionContent>
        )}
      </Collapse>

      <Collapse title={t('inboxSidebar.visitorsData')}>
        {openCollapse && (
          <S.SectionContent>
            <S.DataRow>
              <S.DataWidth>
                <S.Field>{t('inboxSidebar.userID')}</S.Field>
              </S.DataWidth>
              <S.DataValue>566</S.DataValue>
            </S.DataRow>
            <S.DataRow>
              <S.DataWidth>
                <S.Field>{t('inboxSidebar.info')}</S.Field>
              </S.DataWidth>
              <S.DataValue>
                <S.DataLinkWrapper>
                  <S.LinkText>Link...</S.LinkText>
                  <S.LinkActionIcons>
                    <Image src={copy} preview={false} />
                    <Image src={close} preview={false} />
                  </S.LinkActionIcons>
                </S.DataLinkWrapper>
              </S.DataValue>
            </S.DataRow>
            <S.countryCenter>
              {t('inboxSidebar.add')}
            </S.countryCenter>
          </S.SectionContent>
        )}
      </Collapse>
    </S.Container>
  );
};

export default InboxSidebar;
