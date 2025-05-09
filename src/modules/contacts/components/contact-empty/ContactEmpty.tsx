import { Image } from 'antd';
import { useState } from 'react';
import { ReactSVG } from 'react-svg';
import { useTranslation } from 'react-i18next';

import { useModal } from '@/shared/hooks';

import Button from '@/shared/components/common/Button';
import Typography from '@/shared/components/common/Typography';
import ModalAddContact from '../modal-add-contact/ModalAddContact';
import fontWeight from '@/shared/styles/themes/default/fontWeight';

import * as S from './ContactEmpty.styles';

import icPlus from '@/assets/icons/contact/ic-plus.svg';
import icImport from '@/assets/icons/contact/ic-import.svg';
import imgContactEmpty from '@/assets/images/contact/img-contact-empty.png';

function ContactEmpty() {
  const { t } = useTranslation('contacts');
  const [isLoading] = useState<boolean>(false);

  const { visible: addContact, toggle: handleOpenModalAddContact } = useModal();

  function handleImportContact() {
    //TODO handle later
  }

  function handleAddContact() {
    //TODO handle later
  }

  return (
    <S.ContactEmptyContainer>
      <Image src={imgContactEmpty} width={200} height={200} preview={false} />
      <Typography variant="h5" textAlign="center" margin="8xp 0 0 0">
        {t('empty.you-have-no-contact')}
      </Typography>
      <Typography textAlign="center" margin="12px 0 0 0">
        {t('empty.contacts-are-stored')}
      </Typography>

      <S.ContactActions>
        <Button
          icon={<Image src={icPlus} preview={false} width={18} height={18} />}
          onClick={handleOpenModalAddContact}
        >
          <Typography fontWeight={fontWeight?.semiBold}>
            {t('empty.new-contact')}
          </Typography>
        </Button>
        <Button
          type="primary"
          icon={<ReactSVG src={icImport} width={18} height={18} />}
          onClick={handleImportContact}
        >
          {t('empty.import-contact')}
        </Button>
      </S.ContactActions>
      {addContact && (
        <ModalAddContact
          open={addContact}
          onCancel={handleOpenModalAddContact}
          onOk={handleAddContact}
          isLoading={isLoading}
        />
      )}
    </S.ContactEmptyContainer>
  );
}

export default ContactEmpty;
