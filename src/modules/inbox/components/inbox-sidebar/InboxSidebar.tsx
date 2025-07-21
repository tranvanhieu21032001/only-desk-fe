import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Form } from 'antd';

import * as S from './InboxSidebar.styles';

import ProfileCard from '@/shared/components/common/ProfileCard';
import UserProfileModal from './components-inbox-sidebar/UserProfileModal';
import DropdownWithCollapse from './components-inbox-sidebar/DropdownWithCollapse';
import LocationCollapse from './components-inbox-sidebar/LocationCollapse';
import VisitorDeviceCollapse from './components-inbox-sidebar/VisitorDeviceCollapse';
import ConversationParticipantsSection from './components-inbox-sidebar/ConversationParticipantsCollapse';
import QuickJumpSection from './components-inbox-sidebar/QuickJumpSection';
import ConversationSegments from './components-inbox-sidebar/ConversationSegments';
import VisitorsData from './components-inbox-sidebar/VisitorsData';

import {
  fetchContacts,
  fetchDetailsContact,
} from '@/modules/contacts/store/features/contacts';
import { useAppDispatch, useAppSelector } from '@/shared/hooks';
import { RootState } from '@/core/store';
import { Contact } from '@/modules/inbox/interfaces/inbox';
import Button from '@/shared/components/common/Button';
import { handleUpdateConversation } from '../../api/conversations.api';

const InboxSidebar = () => {
  const { t } = useTranslation('inbox');
  const dispatch = useAppDispatch();

  const [openCollapse] = useState(true);
  const [selected, setSelected] = useState<Contact | null>(null);
  const [openDropdown, setOpenDropdown] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [tags, setTags] = useState<string[]>([]);
  const [isAddParticipantModalOpen, setIsAddParticipantModalOpen] =
    useState(false);
  const [participantEmail, setParticipantEmail] = useState('');
  const [participants, setParticipants] = useState<string[]>([]);
  const [openQuickJump, setOpenQuickJump] = useState({
    image: false,
    conversation: false,
  });

  const { selectedConversation } = useAppSelector((state) => state.inbox);
  const { contacts, contactDetails } = useAppSelector(
    (state: RootState) => state.contacts,
  );
  const [form] = Form.useForm();
console.log("selectedConversation", selectedConversation);

  useEffect(() => {
    dispatch(fetchContacts({}));

    const id = selectedConversation?.contact?.id;
    if (id) {
      dispatch(fetchDetailsContact({ idContact: id }));
    }
  }, [dispatch, selectedConversation?.contact?.id]);

  useEffect(() => {
    if (contactDetails?.segments && Array.isArray(contactDetails.segments)) {
      setTags(contactDetails.segments);
    }
  }, [contactDetails]);

  useEffect(() => {
    if (contacts.length && !selected) {
      setSelected(contacts[0]);
    }
  }, [contacts, selected]);

  const handleSelect = (option: Contact) => {
    setSelected(option);
    setOpenDropdown(false);
  };

  const openAddParticipantModal = () => setIsAddParticipantModalOpen(true);
  const closeAddParticipantModal = () => {
    setIsAddParticipantModalOpen(false);
    setParticipantEmail('');
  };

  useEffect(() => {
    let convertMetadata: { key: string; value: string }[] = [];

    if (Array.isArray(contactDetails?.metadata)) {
      convertMetadata = contactDetails.metadata.map((item) => ({
        key: String(item.key),
        value: String(item.value),
      }));
    } else {
      convertMetadata = Object.entries(contactDetails?.metadata || {}).map(
        ([key, value]) => ({
          key: String(key),
          value: String(value),
        }),
      );
    }

    const defaultValuesForm = {
      ...contactDetails,
      metadata: convertMetadata,
    };

    if (defaultValuesForm) {
      form.setFieldsValue(defaultValuesForm);
    }
  }, [contactDetails, form]);
const handleEditContactProfile = async (values: any) => {
  const { metadata, segments, assignedToId, ...rest } = values;

  const metadataObject = (metadata || []).reduce(
    (acc: Record<string, string>, item: any) => {
      if (item.key?.trim()) {
        acc[item.key] = item.value;
      }
      return acc;
    },
    {},
  );

  const payload = {
    resolved: true,
    assignedToId: assignedToId || selectedConversation?.contact?.rawId,
    participantsIds: participants,
    segments: segments || contactDetails?.segments || [],
    metadata: metadataObject,
  };

  try {
    const conversationId = selectedConversation?.rawId || '';
    await handleUpdateConversation(conversationId, payload, t)
  } catch (error) {
    console.error('Error updating contact:', error);
  }
};

  return (
    <S.Container>
      <Form form={form} onFinish={handleEditContactProfile}>
        <ProfileCard
          contactId={selectedConversation?.contact?.id}
          avatarSize={60}
          email={selectedConversation?.contact?.email}
          name={selectedConversation?.contact?.name || ''}
          avatarUrl={selectedConversation?.contact?.avatar}
          countryCode={selectedConversation?.contact?.countryCode}
        />

        <S.countryCenter onClick={() => setShowModal(true)}>
          {t('inboxSidebar.viewProfile')}
        </S.countryCenter>

        {showModal && (
          <UserProfileModal isOpen={true} onClose={() => setShowModal(false)} />
        )}

        <DropdownWithCollapse
          openDropdown={openDropdown}
          setOpenDropdown={setOpenDropdown}
          selected={selected}
          options={contacts}
          handleSelect={handleSelect}
        />

        <LocationCollapse openCollapse={openCollapse} />
        <VisitorDeviceCollapse openCollapse={openCollapse} />

        <ConversationParticipantsSection
          openCollapse={openCollapse}
          participants={participants}
          setParticipants={setParticipants}
          isAddParticipantModalOpen={isAddParticipantModalOpen}
          openAddParticipantModal={openAddParticipantModal}
          closeAddParticipantModal={closeAddParticipantModal}
          participantEmail={participantEmail}
          setParticipantEmail={setParticipantEmail}
          contacts={contacts}
        />

        <QuickJumpSection
          t={t}
          openCollapse={openCollapse}
          openQuickJump={openQuickJump}
          setOpenQuickJump={setOpenQuickJump}
        />

        <ConversationSegments
          t={t}
          openCollapse={openCollapse}
          segment={contactDetails?.segments || []}
        />

        <VisitorsData t={t} openCollapse={openCollapse} />

       <S.WrapperButton>
         <Button htmlType="submit">Update</Button>
       </S.WrapperButton>
      </Form>
    </S.Container>
  );
};

export default InboxSidebar;
