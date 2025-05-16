import { Image } from 'antd';
import { useTranslation } from 'react-i18next';

import themeColors from '@/shared/styles/themes/default/colors';
import fontWeight from '@/shared/styles/themes/default/fontWeight';

import Button from '@/shared/components/common/Button';
import Typography from '@/shared/components/common/Typography';
import ModalCommon from '@/shared/components/common/ModalBase';

import * as S from './ModalConfirmCreateWorkspace.styles';

import icWarning from '@/assets/icons/workspace/ic-info-red.svg';

interface ModalConfirmExportDatabaseProps {
  open: boolean;
  onCancel: () => void;
}

function ModalConfirmCreateWorkspace({
  open,
  onCancel,
}: ModalConfirmExportDatabaseProps) {
  const { t } = useTranslation('workspaces');

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
          <Image src={icWarning} width={40} height={40} preview={false} />
          <S.ModalHeaderContent>
            <Typography fontWeight={fontWeight?.semiBold}>
              {t('modal-confirm-create-workspace.this-domain')}
            </Typography>
            <S.ModalDescription>
              <Typography color={themeColors?.newtralLight}>
                {t('modal-confirm-create-workspace.you-may-be')}
              </Typography>
            </S.ModalDescription>
          </S.ModalHeaderContent>
        </S.ModalHeader>

        <S.ModalFooter>
          <Button onClick={onCancel}>
            {t('modal-confirm-create-workspace.cancel')}
          </Button>
          <Button onClick={onCancel} backgroundColor={themeColors?.errorDark}>
            {t('modal-confirm-create-workspace.yes-create-workspace')}
          </Button>
        </S.ModalFooter>
      </ModalCommon>
    </S.WrapModal>
  );
}

export default ModalConfirmCreateWorkspace;
