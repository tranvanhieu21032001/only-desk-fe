import { Image } from 'antd';
import { useTranslation } from 'react-i18next';

import themeColors from '@/shared/styles/themes/default/colors';
import fontWeight from '@/shared/styles/themes/default/fontWeight';

import Button from '@/shared/components/common/Button';
import Typography from '@/shared/components/common/Typography';
import ModalCommon from '@/shared/components/common/ModalBase';

import * as S from './ModalConfirmExportDatabase.styles';

import icConfirm from '@/assets/icons/contact/ic-confirm.svg';

interface ModalConfirmExportDatabaseProps {
  open: boolean;
  onCancel: () => void;
}

function ModalConfirmExportDatabase({
  open,
  onCancel,
}: ModalConfirmExportDatabaseProps) {
  const { t } = useTranslation('contacts');

  return (
    <S.WrapModal>
      <ModalCommon
        open={open}
        onCancel={onCancel}
        showFooter={false}
        width={440}
        rootClassName="modal-confirm-export-database"
      >
        <S.ModalHeader>
          <Image src={icConfirm} width={40} height={40} preview={false} />
          <S.ModalHeaderContent>
            <Typography fontWeight={fontWeight?.semiBold}>
              {t('modal-confirm-export.export-contact-database')}
            </Typography>
            <S.ModalDescription>
              <Typography color={themeColors?.newtralLight}>
                {t('modal-confirm-export.it-will-export')}
              </Typography>
            </S.ModalDescription>
          </S.ModalHeaderContent>
        </S.ModalHeader>

        <S.ModalFooter>
          <Button onClick={onCancel}>{t('modal-confirm-export.cancel')}</Button>
        </S.ModalFooter>
      </ModalCommon>
    </S.WrapModal>
  );
}

export default ModalConfirmExportDatabase;
