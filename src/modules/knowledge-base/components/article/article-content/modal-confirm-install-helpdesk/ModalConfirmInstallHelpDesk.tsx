import { Image } from 'antd';
import { useTranslation } from 'react-i18next';

import themeColors from '@/shared/styles/themes/default/colors';
import fontWeight from '@/shared/styles/themes/default/fontWeight';

import Button from '@/shared/components/common/Button';
import Typography from '@/shared/components/common/Typography';
import ModalCommon from '@/shared/components/common/ModalBase';

import * as S from './ModalConfirmInstallHelpDesk.styles';

import icConfirm from '@/assets/icons/contact/ic-confirm.svg';
import { PlusCircleOutlined } from '@ant-design/icons';

interface ModalConfirmInstallHelpDeskProps {
  open: boolean;
  onCancel: () => void;
  onOK: () => void;
}

function ModalConfirmInstallHelpDesk({
  open,
  onCancel,
  onOK,
}: ModalConfirmInstallHelpDeskProps) {
  const { t } = useTranslation('knowledgeBase');

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
              {t('article-menu.install-helpdesk.helpdesk-is-available')}
            </Typography>
            <S.ModalDescription>
              <Typography color={themeColors?.newtralLight}>
                {t('article-menu.install-helpdesk.the-helpdesk')}
              </Typography>
            </S.ModalDescription>
          </S.ModalHeaderContent>
        </S.ModalHeader>

        <S.ModalFooter>
          <Button onClick={onCancel}>
            {t('article-menu.install-helpdesk.cancel')}
          </Button>
          <Button onClick={onOK} type="primary" icon={<PlusCircleOutlined />}>
            {t('article-menu.install-helpdesk.install-helpdesk')}
          </Button>
        </S.ModalFooter>
      </ModalCommon>
    </S.WrapModal>
  );
}

export default ModalConfirmInstallHelpDesk;
