import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Form } from 'antd';

import * as S from './InboxSidebar.styles';

import ProfileCard from '@/shared/components/common/ProfileCard';
import UserProfileModal from './components/UserProfileModal';
import DropdownWithCollapse from './components/DropdownWithCollapse';
import LocationCollapse from './components/LocationCollapse';
import VisitorDeviceCollapse from './components/VisitorDeviceCollapse';
import ConversationParticipantsSection from './components/ConversationParticipantsCollapse';
import QuickJumpSection from './components/QuickJumpSection';
import ConversationSegments from './components/ConversationSegments';
import VisitorsData from './components/VisitorsData';

import {
  fetchDetailsContact,
} from '@/modules/contacts/store/features/contacts';
import { useAppDispatch, useAppSelector } from '@/shared/hooks';
import { RootState } from '@/core/store';
import { handleUpdateConversation } from '../../api/conversations.api';
import { fetchOperators } from '@/modules/settings/store/features/operators';
import defaultAvatar from '@/assets/images/avatar-default.png';

const InboxSidebar = () => {
  const { t } = useTranslation('inbox');
  const dispatch = useAppDispatch();

  const [openCollapse] = useState(true);
  const [selected, setSelected] = useState<any | null>(null);
  const [openDropdown, setOpenDropdown] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [tags, setTags] = useState<string[]>([]);
  const [isAddParticipantModalOpen, setIsAddParticipantModalOpen] = useState(false);
  const [participantEmail, setParticipantEmail] = useState('');
  const [participants, setParticipants] = useState<string[]>([]);
  const [openQuickJump, setOpenQuickJump] = useState({
    image: false,
    conversation: false,
  });

  const { selectedConversation } = useAppSelector((state) => state.inbox);
  const { contactDetails } = useAppSelector((state: RootState) => state.contacts);
  const { operators } = useAppSelector((state) => state.operators);
  const [form] = Form.useForm();

  const formattedOperators = useMemo(() => {
    return operators.map((op) => {
      const { user, rawId, id } = op;
      const fullName = [user?.firstName, user?.lastName].filter(Boolean).join(' ') || "Guest";
      return {
        id,
        rawId,
        name: fullName,
        avatar: user?.avatar || defaultAvatar,
        email: user?.email,
      };
    });
  }, [operators]);

  useEffect(() => {
    if (formattedOperators.length && !selected) {
      setSelected(formattedOperators[0]);
    }
  }, [formattedOperators, selected]);

  useEffect(() => {
    dispatch(fetchOperators());
  }, [dispatch]);

  useEffect(() => {
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

  const handleAutoUpdateConversation = async (partialData: Partial<any>) => {
    try {
      const conversationId = selectedConversation?.rawId || '';
      const metadataObject = form.getFieldValue('metadata')?.reduce(
        (acc: Record<string, string>, item: any) => {
          if (item.key?.trim()) acc[item.key] = item.value;
          return acc;
        },
        {}
      );

      const basePayload = {
        assignedToId: selected?.rawId || '',
        segments: tags,
        participantsIds: participants,
        metadata: metadataObject,
        ...partialData,
      };

      await handleUpdateConversation(conversationId, basePayload, t);
    } catch (err) {
      console.error('Auto update conversation failed:', err);
    }
  };

  const handleSelect = (option: any) => {
    setSelected(option);
    setOpenDropdown(false);
    handleAutoUpdateConversation({ assignedToId: option.rawId });
  };

  return (
    <S.Container>
      <Form form={form}>
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
          <UserProfileModal isOpen={true} onClose={() => setShowModal(false)} selectedConversation={selectedConversation || {}} />
        )}

        <DropdownWithCollapse
          openDropdown={openDropdown}
          setOpenDropdown={setOpenDropdown}
          selected={selected}
          options={formattedOperators}
          handleSelect={handleSelect}
        />

        <LocationCollapse openCollapse={openCollapse} />
        {/* <VisitorDeviceCollapse openCollapse={openCollapse} /> */}

        <ConversationParticipantsSection
          openCollapse={openCollapse}
          participants={participants}
          setParticipants={setParticipants}
          isAddParticipantModalOpen={isAddParticipantModalOpen}
          openAddParticipantModal={() => setIsAddParticipantModalOpen(true)}
          closeAddParticipantModal={() => {
            setIsAddParticipantModalOpen(false);
            setParticipantEmail('');
          }}
          participantEmail={participantEmail}
          setParticipantEmail={setParticipantEmail}
          contacts={formattedOperators}
          onConfirmAddParticipants={(newParticipants) => {
            setParticipants(newParticipants);
            handleAutoUpdateConversation({ participantsIds: newParticipants });
          }}
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
          segment={tags}
          onChangeSegment={(newTags) => {
            setTags(newTags);
            handleAutoUpdateConversation({ segments: newTags });
          }}
        />

      <VisitorsData
        t={t}
        openCollapse={openCollapse}
        onChange={(newMetadata) => {
          form.setFieldValue('metadata', newMetadata);
          handleAutoUpdateConversation({});
        }}
      />

      </Form>
    </S.Container>
  );
};

export default InboxSidebar;
