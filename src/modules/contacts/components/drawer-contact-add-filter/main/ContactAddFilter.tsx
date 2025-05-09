import { Image } from 'antd';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { isEmpty } from 'lodash';

import { useModal } from '@/shared/hooks';
import themeColors from '@/shared/styles/themes/default/colors';

import EmptyFilter from '../empty-filter/EmptyFilter';
import Button from '@/shared/components/common/Button';
import Typography from '@/shared/components/common/Typography';
import ModalConfirmCreateFilter from '../modal-confirm-create-filter/ModalConfirmCreateFilter';

import * as S from './ContactAddFilter.styles';

import icClose from '@/assets/icons/contact/ic-close.svg';

interface ContactAddFilterProps {
  open: boolean;
  onClose: () => void;
}

function ContactAddFilter({ open, onClose }: ContactAddFilterProps) {
  const { t } = useTranslation('contacts');

  const {
    visible: confirmCreateFilter,
    toggle: handleModalConfirmCreateFilter,
  } = useModal();

  const [filters, setFilters] = useState<any[]>([]);

  useEffect(() => {
    setFilters([]);
  }, []);

  function handleSaveFilter() {
    if (isEmpty(filters)) {
      handleModalConfirmCreateFilter();
    }
  }

  function handleCreateFilter() {
    //Handle later
  }

  return (
    <S.ContactAddFilterContainer>
      <S.DrawerContent
        placement="right"
        width={500}
        onClose={onClose}
        open={open}
        rootClassName="drawer-contact-add-filter"
      >
        <S.HeaderWrap>
          <Typography variant="h5">
            {t('add-filter.advanced-filter')}
          </Typography>
          <Typography color={themeColors?.newtralLight}>
            {t('add-filter.insert-page')}
          </Typography>
          <Image
            onClick={onClose}
            src={icClose}
            width={24}
            height={24}
            preview={false}
          />
        </S.HeaderWrap>
        <S.Body>
          {isEmpty(filters) ? <EmptyFilter /> : <S.FilterWrap></S.FilterWrap>}
        </S.Body>
        <S.Footer>
          <S.BtnCancel onClick={onClose}>{t('add-filter.cancel')}</S.BtnCancel>
          <Button type="primary" onClick={handleSaveFilter}>
            {t(
              `${isEmpty(filters) ? 'add-filter.new-filter' : 'add-filter.save'}`,
            )}
          </Button>
        </S.Footer>
      </S.DrawerContent>

      {confirmCreateFilter && (
        <ModalConfirmCreateFilter
          open={confirmCreateFilter}
          onCancel={handleModalConfirmCreateFilter}
          isLoading={false}
          onOk={handleCreateFilter}
        />
      )}
    </S.ContactAddFilterContainer>
  );
}

export default ContactAddFilter;
