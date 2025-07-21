import React, { useState } from 'react';
import { Image, Select } from 'antd';
import { useTranslation } from 'react-i18next';

import Collapse from '@/shared/components/common/Collapse';

import userPlus from '@/assets/icons/inbox/ic-user-plus.svg';
import closeRed from '@/assets/icons/inbox/ic-close-red.svg';
import defaultAvatar from '@/assets/images/avatar-default.png';

import * as S from '../InboxSidebar.styles';
import { Contact } from '@/modules/inbox/interfaces/inbox';

interface Props {
  openCollapse: boolean;
  participants: string[];
  setParticipants: (value: string[]) => void;
  contacts: Contact[];
  onConfirmAddParticipants: (newParticipants: string[]) => void;
}

const ConversationParticipantsSection: React.FC<Props> = ({
  openCollapse,
  participants,
  setParticipants,
  contacts,
  onConfirmAddParticipants,
}) => {
  const { t } = useTranslation('inbox');
  const [selectedValue, setSelectedValue] = useState<string | undefined>(undefined);

  const emailById = (id: string) =>
    contacts.find((c) => c.rawId === id)?.email || 'Unknown';

  const contactOptions = contacts
    .filter((c) => !participants.includes(c.rawId))
    .map((contact) => ({
      label: (
        <S.OptionContent>
          <S.Avatar src={contact.avatar || defaultAvatar} alt="avatar" />
          <div>
            <div>{contact.name || 'Unnamed'}</div>
            <small>{contact.email || ''}</small>
          </div>
        </S.OptionContent>
      ),
      value: contact.rawId,
    }));

  const handleRemove = (idx: number) => {
    const updated = participants.filter((_, i) => i !== idx);
    setParticipants(updated);
    onConfirmAddParticipants(updated);
  };

  const handleSelectChange = (value: string) => {
    if (participants.includes(value)) return;
    const updated = [...participants, value];
    setParticipants(updated);
    onConfirmAddParticipants(updated);
    setSelectedValue(undefined);
  };

  return (
    <Collapse title={t('inboxSidebar.conversationParticipants')}>
      {openCollapse && (
        <S.SectionContent>
          {participants.map((rawId, idx) => (
            <S.Participant key={rawId}>
              <S.DropdownRow>
                <Image src={userPlus} preview={false} />
                <S.Field>{emailById(rawId)}</S.Field>
              </S.DropdownRow>
              <S.countryCenter onClick={() => handleRemove(idx)}>
                <Image src={closeRed} preview={false} />
              </S.countryCenter>
            </S.Participant>
          ))}
          <S.Participant>
            <Select
              key={participants.join('-')}
              placeholder={t('inboxSidebar.selectEmailPlaceholder')}
              options={contactOptions}
              style={{ width: '100%' }}
              value={selectedValue}
              onChange={handleSelectChange}
              optionLabelProp="label"
            />
          </S.Participant>
        </S.SectionContent>
      )}
    </Collapse>
  );
};

export default ConversationParticipantsSection;
