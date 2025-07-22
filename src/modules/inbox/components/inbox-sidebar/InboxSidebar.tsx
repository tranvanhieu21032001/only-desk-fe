import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Form } from 'antd';

import * as S from './InboxSidebar.styles';

import ProfileCard from '@/shared/components/common/ProfileCard';
import UserProfileModal from './components/UserProfileModal';
import DropdownWithCollapse from './components/DropdownWithCollapse';
import LocationCollapse from './components/LocationCollapse';
// import VisitorDeviceCollapse from './components/VisitorDeviceCollapse';
import ConversationParticipantsSection from './components/ConversationParticipantsCollapse';
import QuickJumpSection from './components/QuickJumpSection';
import ConversationSegments from './components/ConversationSegments';
import VisitorsData from './components/VisitorsData';

import { fetchDetailsContact } from '@/modules/contacts/store/features/contacts';
import { useAppDispatch, useAppSelector } from '@/shared/hooks';
import { RootState } from '@/core/store';
import { handleUpdateConversation } from '../../api/conversations.api';
import { fetchOperators } from '@/modules/settings/store/features/operators';
import defaultAvatar from '@/assets/images/avatar-default.png';
import Input from '@/shared/components/common/Input';
import { handleEditProfile } from '@/modules/contacts/api/contacts.api';
import { fetchConversationDetail } from '../../store/features/inbox';

const InboxSidebar = () => {
  const { t } = useTranslation('inbox');
  const dispatch = useAppDispatch();

  const [openCollapse] = useState(true);
  const [selected, setSelected] = useState<any | null>(null);
  const [openDropdown, setOpenDropdown] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [tags, setTags] = useState<string[]>([]);
  const [participants, setParticipants] = useState<string[]>([]);
  const [openQuickJump, setOpenQuickJump] = useState({
    image: false,
    conversation: false,
  });

  const { selectedConversation } = useAppSelector((state) => state.inbox);
  const { operators } = useAppSelector((state) => state.operators);
  const [form] = Form.useForm();
console.log("selectedConversation", selectedConversation);


  const formattedOperators = useMemo(() => {
    return operators.map((op) => {
      const { user, rawId, id } = op;
      const fullName =
        [user?.firstName, user?.lastName].filter(Boolean).join(' ') || 'Guest';
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
    if (selectedConversation?.contact?.segments && Array.isArray(selectedConversation?.contact?.segments)) {
      setTags(selectedConversation?.contact?.segments);
    }
  }, [selectedConversation]);

  useEffect(() => {
    let convertMetadata: { key: string; value: string }[] = [];

    if (Array.isArray(selectedConversation?.contact?.metadata)) {
      convertMetadata = selectedConversation?.contact?.metadata.map((item) => ({
        key: String(item.key),
        value: String(item.value),
      }));
    } else {
      convertMetadata = Object.entries(selectedConversation?.contact?.metadata || {}).map(
        ([key, value]) => ({
          key: String(key),
          value: String(value),
        }),
      );
    }

    const defaultValuesForm = {
      ...selectedConversation,
      metadata: convertMetadata,
    };

    if (defaultValuesForm) {
      form.setFieldsValue(defaultValuesForm);
    }
  }, [selectedConversation, form]);

  const handleAutoUpdateConversation = async (partialData: Partial<any>) => {
    try {
      const conversationId = selectedConversation?.rawId || '';
      const metadataObject = form
        .getFieldValue('metadata')
        ?.reduce((acc: Record<string, string>, item: any) => {
          if (item.key?.trim()) acc[item.key] = item.value;
          return acc;
        }, {});

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

  const updateEmailIfValid = async () => {
    const contactId = selectedConversation?.contact?.rawId;
    if (!contactId) return;

    try {
      const values = await form.validateFields(['email']);
      const email = values.email;

      if (email) {
        await handleEditProfile(
          contactId,
          { email, metadata: [] },
          'Email updated successfully',
          dispatch,
        );
      }
      dispatch(fetchConversationDetail(selectedConversation?.id))
    } catch {
      // Do nothing on validation error
    }
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

        {selectedConversation?.contact?.email ? (
          <S.countryCenter onClick={() => setShowModal(true)}>
            {t('inboxSidebar.viewProfile')}
          </S.countryCenter>
        ) : (
          <S.WrapperButton>
            <Form.Item
              name="email"
              rules={[
                { required: true, message: 'Please enter an email' },
                { type: 'email', message: 'Please enter a valid email address' },
              ]}
            >
              <Input
                placeholder="Enter your email"
                onBlur={updateEmailIfValid}
              />
            </Form.Item>
          </S.WrapperButton>
        )}

        {showModal && (
          <UserProfileModal
            isOpen={true}
            onClose={() => setShowModal(false)}
            selectedConversation={selectedConversation}
          />
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
          operators={formattedOperators}
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
          allSegmentOptions={selectedConversation?.contact?.segments || []}
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
