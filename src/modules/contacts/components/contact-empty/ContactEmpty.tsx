import { Image } from 'antd';
import { useTranslation } from 'react-i18next';
import { ReactSVG } from 'react-svg';

import Button from '@/shared/components/common/Button';
import Typography from '@/shared/components/common/Typography';
import fontWeight from '@/shared/styles/themes/default/fontWeight';

import * as S from './ContactEmpty.styles';

import icPlus from '@/assets/icons/contacts/ic-plus.svg';
import icImport from '@/assets/icons/contacts/ic-import.svg';
import imgContactEmpty from '@/assets/images/contact/img-contact-empty.png';

function ContactEmpty() {
  const { t } = useTranslation('contacts');

  function handleNewContact() {
    //TODO handle later
  }

  function handleImportContact() {
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
          onClick={handleNewContact}
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
    </S.ContactEmptyContainer>
  );
}

export default ContactEmpty;
