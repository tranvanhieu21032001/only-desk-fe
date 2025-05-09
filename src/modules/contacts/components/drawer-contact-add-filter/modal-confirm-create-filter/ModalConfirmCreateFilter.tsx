import { Image } from 'antd';
import { useTranslation } from 'react-i18next';
import { PlusCircleOutlined } from '@ant-design/icons';

import themeColors from '@/shared/styles/themes/default/colors';
import fontWeight from '@/shared/styles/themes/default/fontWeight';

import Button from '@/shared/components/common/Button';
import Typography from '@/shared/components/common/Typography';
import ModalCommon from '@/shared/components/common/ModalBase';

import * as S from './ModalConfirmCreateFilter.styles';

import icConfirm from '@/assets/icons/contact/ic-confirm.svg';

interface ModalConfirmCreateFilterProps {
  open: boolean;
  onCancel: () => void;
  onOk?: () => void;
  isLoading: boolean;
}

function ModalConfirmCreateFilter({
  open,
  onCancel,
  onOk,
  isLoading,
}: ModalConfirmCreateFilterProps) {
  const { t } = useTranslation('contacts');

  return (
    <S.WrapModal>
      <ModalCommon
        open={open}
        onCancel={onCancel}
        showFooter={false}
        isLoading={isLoading}
        width={440}
      >
        <S.ModalHeader>
          <Image src={icConfirm} width={40} height={40} preview={false} />
          <S.ModalHeaderContent>
            <Typography fontWeight={fontWeight?.semiBold}>
              {t('modal-confirm.create-filter')}
            </Typography>
            <S.ModalDescription>
              <Typography color={themeColors?.newtralLight}>
                {t('modal-confirm.this-filter-will')}
              </Typography>
            </S.ModalDescription>
          </S.ModalHeaderContent>
        </S.ModalHeader>

        <S.ModalFooter>
          <Button
            type="primary"
            onClick={onOk}
            isLoading={isLoading}
            icon={<PlusCircleOutlined />}
          >
            {t('modal-confirm.create-filter')}
          </Button>
        </S.ModalFooter>
      </ModalCommon>
    </S.WrapModal>
  );
}

export default ModalConfirmCreateFilter;
