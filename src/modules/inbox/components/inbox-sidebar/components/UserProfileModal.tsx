import { useEffect, useState } from 'react';
import { Image } from 'antd';
import { useTranslation } from 'react-i18next';
import AvatarWithStatus from '@/shared/components/common/Avatar';
import * as S from '../InboxSidebar.styles';

// import chorme from '@/assets/icons/common/ic-chorme.svg';
import defaultAvatar from '@/assets/images/avatar-default.png';
import flag from '@/assets/icons/common/ic-flag.svg';
import chatBlue from '@/assets/icons/common/ic-chat-blue.svg';
import badge from '@/assets/icons/common/ic-badge.svg';
import addBlue from '@/assets/icons/common/ic-add-blue.svg';
// import earthBlue from '@/assets/icons/common/ic-earth-blue.svg';
import locationBlue from '@/assets/icons/common/ic-locaion-blue.svg';
// import cloudBlue from '@/assets/icons/common/ic-cloud-blue.svg';
// import screen from '@/assets/icons/common/ic-screen.svg';
// import flagAmerica from '@/assets/icons/common/ic-flag-america.svg';
import company from '@/assets/icons/common/ic-company.svg';
import noteBlue from '@/assets/icons/common/ic-note-blue.svg';
import tagsBlue from '@/assets/icons/common/ic-tags-blue.svg';

import ProfilePreviewModal from '../../profile-preview-modal/ProfilePreviewModal';
import ProfileCard from '@/shared/components/common/ProfileCard';
import { format } from 'timeago.js';
import dayjs from 'dayjs';
import LastReportedLocationBody from '@/shared/components/common/ReportedLocation/LastReportedLocationBody';
import { useAppDispatch, useAppSelector } from '@/shared/hooks';
import CompanyInfoBody from '@/shared/components/common/CompanyInfoBody/CompanyInfoBody';
import Typography from '@/shared/components/common/Typography';
import empty from '@/assets/images/contact/img-contact-empty.png';
import SegmentsBody from '@/shared/components/common/SegmentsBody/SegmentsBody';
import { fetchDetailsContact } from '@/modules/contacts/store/features/contacts';
import {
  listenUserStatus,
  offUserStatus,
} from '@/shared/chat-logic/services/socket';
interface UserProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const UserProfileModal: React.FC<UserProfileModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { t } = useTranslation('inbox');
  const { contactDetails, isLoading } = useAppSelector(
    (state) => state.contacts,
  );
  const [isOnline, setIsOnline] = useState(contactDetails?.isOnline || false);
  const [lastActive, setLastActive] = useState<string | null>(null);

  const { selectedConversation } = useAppSelector((state) => state.inbox);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (selectedConversation?.contact?.rawId) {
      dispatch(
        fetchDetailsContact({ idContact: selectedConversation?.contact?.id }),
      );
    }
  }, [dispatch, selectedConversation?.contact?.rawId]);

  // const renderNotes = useMemo(() => {
  //   if (!contactDetails?.notes) {
  //     return (
  //       <S.EmptyWrap>
  //         <Image src={empty} width={120} height={120} preview={false} />
  //         <Typography margin="8px 0 0 0">
  //           {t('contact-profile.no-data-added')}
  //         </Typography>
  //       </S.EmptyWrap>
  //     );
  //   }

  //   return (
  //     <TextArea
  //       disabled={true}
  //       placeholder={t('contact-profile.enter-notes')}
  //     />
  //   );
  // }, [contactDetails?.notes]);

  useEffect(() => {
    const contactId = selectedConversation?.contact?.id;
    if (!contactId) return;

    const handleStatus = (data: {
      contactId?: string;
      isOnline: boolean;
      lastActivityAt?: string | Date;
    }) => {
      if (data.contactId !== contactId) return;
      setIsOnline(data.isOnline);

      if (!data.isOnline && data.lastActivityAt) {
        setLastActive(format(new Date(data.lastActivityAt)));
      }
    };

    listenUserStatus(handleStatus);
    return () => offUserStatus(handleStatus);
  }, [selectedConversation]);

  return (
    <ProfilePreviewModal
      isOpen={isOpen}
      onClose={onClose}
      redirectUrl={`/contacts/${selectedConversation?.contact?.id}`}
    >
      <S.PanelWrapper>
        <S.PanelHeader>
          <S.PanelColumn>
            <ProfileCard
              contactId={selectedConversation?.contact?.id}
              avatarSize={40}
              email={selectedConversation?.contact?.email}
              name={selectedConversation?.contact?.name || ''}
              avatarUrl={selectedConversation?.contact?.avatar}
              countryCode={selectedConversation?.contact?.countryCode}
              hiddenLastActive
            />
            <S.PanelItem>
              <S.PanelP>
                {t('inboxSidebar.createdDate')}:{' '}
                {selectedConversation?.contact.createdAt &&
                  dayjs(selectedConversation.contact.createdAt).format(
                    'MM/DD/YYYY',
                  )}
              </S.PanelP>
              {!isOnline && lastActive && (
                <S.PanelP>
                  {t('inboxSidebar.lastActive')}: {lastActive}
                </S.PanelP>
              )}
            </S.PanelItem>
          </S.PanelColumn>
        </S.PanelHeader>

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

        {/* <S.PanelSection>
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
        </S.PanelSection> */}

        <S.PanelSection>
          <S.SectionHeading>
            <S.SectionWidth>
              <Image src={locationBlue} preview={false} />
              Last Reported Location
            </S.SectionWidth>
          </S.SectionHeading>
          <LastReportedLocationBody
            context={contactDetails?.context}
            isLoading={isLoading}
          />
        </S.PanelSection>

        <S.CompanyRow>
          <S.PanelSectionEnd>
            <S.SectionHeading>
              <S.SectionWidth>
                <Image src={company} preview={false} />
                Company
              </S.SectionWidth>
            </S.SectionHeading>

            <CompanyInfoBody isLoading={isLoading || false} isDetails={true} />
          </S.PanelSectionEnd>

          <S.PanelSectionNotepad>
            <S.PanelSectionColumn>
              <S.SectionHeading>
                <S.SectionWidth>
                  <Image src={noteBlue} preview={false} />
                  Private Notepad
                </S.SectionWidth>
              </S.SectionHeading>

              {contactDetails?.notes ? (
                <S.NoteBox>{contactDetails.notes}</S.NoteBox>
              ) : (
                <S.EmptyWrap>
                  <Image src={empty} width={80} height={80} preview={false} />
                  <Typography margin="8px 0 0 0">No data</Typography>
                </S.EmptyWrap>
              )}
            </S.PanelSectionColumn>

            <S.PanelSection>
              <S.SectionHeading>
                <S.SectionWidth>
                  <Image src={tagsBlue} preview={false} />
                  Segments
                </S.SectionWidth>
              </S.SectionHeading>

              <SegmentsBody
                isDetails={true}
                segments={contactDetails?.segments || []}
                isLoading={isLoading || false}
                t={t}
                emptySize={80}
              />
            </S.PanelSection>
          </S.PanelSectionNotepad>
        </S.CompanyRow>
      </S.PanelWrapper>
    </ProfilePreviewModal>
  );
};

export default UserProfileModal;
