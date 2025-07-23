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

import { useAppDispatch, useAppSelector } from '@/shared/hooks';
import { handleUpdateConversation } from '../../api/conversations.api';
import { fetchOperators } from '@/modules/settings/store/features/operators';
import defaultAvatar from '@/assets/images/avatar-default.png';
import Input from '@/shared/components/common/Input';
import { handleEditProfile } from '@/modules/contacts/api/contacts.api';
import { updateSelectedConversationContact } from '../../store/features/inbox';

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

  const formattedOperators = useMemo(() => {
    return operators.map((op) => {
      const { user } = op;
      const fullName =
        [user?.firstName, user?.lastName].filter(Boolean).join(' ') || 'No Name';
      return {
        id: user.id,
        rawId: user.rawId,
        name: fullName,
        avatar: user?.avatar || defaultAvatar,
        email: user?.email,
      };
    });
  }, [operators]);

  useEffect(() => {
    dispatch(fetchOperators());
  }, [dispatch]);

  useEffect(() => {
    if (Array.isArray(selectedConversation?.contact?.segments)) {
      setTags(selectedConversation.contact.segments);
    }
  }, [selectedConversation]);

  useEffect(() => {
    let convertMetadata: { key: string; value: string }[] = [];

    const rawMetadata = selectedConversation?.contact?.metadata;

    if (Array.isArray(rawMetadata)) {
      convertMetadata = rawMetadata.map((item) => ({
        key: String(item.key),
        value: String(item.value),
      }));
    } else {
      convertMetadata = Object.entries(rawMetadata || {}).map(
        ([key, value]) => ({
          key: String(key),
          value: String(value),
        }),
      );
    }

    const defaultValuesForm = {
      ...selectedConversation,
      segments: selectedConversation?.contact?.segments,
      metadata: convertMetadata,
    };

    if (defaultValuesForm) {
      form.setFieldsValue(defaultValuesForm);
    }
  }, [selectedConversation, form]);

const handleAutoUpdateConversation = async (partialData: Partial<any>) => {
  try {
    const conversationId = selectedConversation?.rawId;
    if (!conversationId || !partialData || Object.keys(partialData).length === 0) return;

    const changedFields: Record<string, any> = {};

    for (const key of Object.keys(partialData)) {
      const newValue = partialData[key];
      let oldValue;

        switch (key) {
          case 'assignedToId':
            oldValue = selectedConversation?.assignedTo?.user?.rawId;
            break;
          case 'participantsIds':
            oldValue = (selectedConversation?.participants || [])
              .map((p) => p.user?.rawId)
              .filter(Boolean);
            break;
          case 'segments':
            oldValue = selectedConversation?.contact?.segments || [];
            break;
          case 'metadata':
            const raw = selectedConversation?.contact?.metadata || {};
            oldValue = Array.isArray(raw)
              ? raw.reduce((acc: any, item: any) => {
                  if (item.key?.trim()) acc[item.key] = String(item.value);
                  return acc;
                }, {})
              : raw;
            break;
          default:
            oldValue = selectedConversation?.[key];
        }

      if (JSON.stringify(oldValue) !== JSON.stringify(newValue)) {
        changedFields[key] = newValue;
      }
    }

    if (Object.keys(changedFields).length === 0) return;

    await handleUpdateConversation(conversationId, changedFields, t);
  } catch {}
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
          { email},
          'Email updated successfully',
          dispatch,
        );
      }
         dispatch(updateSelectedConversationContact({ email }));
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
          onConfirmAddParticipants={(newRawIds) => {
            setParticipants(newRawIds);
            handleAutoUpdateConversation({ participantsIds: newRawIds });
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
            const metadataObject = newMetadata.reduce((acc: any, { key, value }: any) => {
              if (key?.trim()) acc[key] = value;
              return acc;
            }, {});
            handleAutoUpdateConversation({ metadata: metadataObject });
          }}
        />
      </Form>
    </S.Container>
  );
};

export default InboxSidebar;
