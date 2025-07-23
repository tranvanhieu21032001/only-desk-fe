import React, { useState, useEffect } from 'react';
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
  participants: string[]; // rawId[]
  setParticipants: (value: string[]) => void;
  operators: Contact[];   // full user objects
  onConfirmAddParticipants: (newParticipants: string[]) => void;
}

const ConversationParticipantsSection: React.FC<Props> = ({
  openCollapse,
  participants,
  setParticipants,
  operators,
  onConfirmAddParticipants,
}) => {
  const { t } = useTranslation('inbox');
  const [selectedValue, setSelectedValue] = useState<string | undefined>(undefined);

  // Tìm email theo rawId
  const emailById = (id: string) =>
    operators.find((c) => c.rawId === id)?.email || 'Unknown';

  // Tạo options cho dropdown, bỏ qua người đã có trong participants
  const operatorOptions = operators
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

  // Xoá người tham gia
  const handleRemove = (idx: number) => {
    const updated = participants.filter((_, i) => i !== idx);
    setParticipants(updated);
    onConfirmAddParticipants(updated);
  };

  // Chọn người mới
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
          {/* Hiển thị danh sách người tham gia */}
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

          {/* Dropdown chọn người thêm */}
          <S.Participant>
            <Select
              key={participants.join('-')}
              placeholder={t('inboxSidebar.selectEmailPlaceholder')}
              options={operatorOptions}
              style={{ width: '100%' }}
              value={selectedValue}
              onChange={handleSelectChange}
              optionLabelProp="label"
              showSearch
              filterOption={(input, option) =>
                (option?.label as any)?.props?.children[1]?.props?.children[0]
                  ?.toLowerCase()
                  ?.includes(input.toLowerCase()) ?? false
              }
            />
          </S.Participant>
        </S.SectionContent>
      )}
    </Collapse>
  );
};

export default ConversationParticipantsSection;
