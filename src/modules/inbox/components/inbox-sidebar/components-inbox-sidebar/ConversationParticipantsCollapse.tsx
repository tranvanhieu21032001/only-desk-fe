import React from 'react';
import { Image, Select } from 'antd';
import { useTranslation } from 'react-i18next';

import Collapse from '@/shared/components/common/Collapse';
import Modal from '@/shared/components/common/Modal';
import Button from '@/shared/components/common/Button';

import mailInfo from '@/assets/icons/common/ic-mail-info.svg';
import userPlus from '@/assets/icons/inbox/ic-user-plus.svg';
import closeRed from '@/assets/icons/inbox/ic-close-red.svg';
import add from '@/assets/icons/inbox/ic-add.svg';

import * as S from '../InboxSidebar.styles';
import { Contact } from '@/modules/inbox/interfaces/inbox';

interface Props {
  openCollapse: boolean;
  participants: string[];
  setParticipants: (value: string[]) => void;
  isAddParticipantModalOpen: boolean;
  openAddParticipantModal: () => void;
  closeAddParticipantModal: () => void;
  contacts: Contact[];
}

const ConversationParticipantsSection: React.FC<Props> = ({
  openCollapse,
  participants,
  setParticipants,
  isAddParticipantModalOpen,
  openAddParticipantModal,
  closeAddParticipantModal,
  contacts,
}) => {
  const { t } = useTranslation('inbox');

  const emailById = (id: string) => {
    return contacts.find((c) => c.rawId === id)?.email || 'Unknown';
  };

  const contactOptions = contacts.map((contact) => ({
    label: contact.email,
    value: contact.rawId,
  }));

  return (
    <>
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

            {participants.map((rawId, idx) => (
              <S.Participant key={rawId}>
                <S.DropdownRow>
                  <Image src={userPlus} preview={false} />
                  <S.Field>{emailById(rawId)}</S.Field>
                </S.DropdownRow>
                <S.countryCenter
                  onClick={() =>
                    setParticipants(participants.filter((_id, i) => i !== idx))
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
          <Button
            type="primary"
            iconPosition="left"
            width="170px"
            icon={<img src={add} alt="" />}
            onClick={closeAddParticipantModal}
          >
            {t('confirm')}
          </Button>
        }
      >
        <S.ParticipantP>
          {t('inboxSidebar.emailAddress')} <span>*</span>
        </S.ParticipantP>
        <Select
          mode="multiple"
          placeholder={t('inboxSidebar.selectEmailPlaceholder')}
          value={participants}
          onChange={(values) => setParticipants(values)}
          options={contactOptions}
          style={{ width: '100%' }}
        />
      </Modal>
    </>
  );
};

export default ConversationParticipantsSection;
