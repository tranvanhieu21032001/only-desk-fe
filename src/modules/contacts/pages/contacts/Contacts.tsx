import { useState, useEffect } from 'react';
import { debounce } from 'lodash';
import { Image } from 'antd';
import { useTranslation } from 'react-i18next';
import { ReactSVG } from 'react-svg';

import { useModal } from '@/shared/hooks';
import { actionFilterOptions } from '@/shared/helper/data/contacts';
import { ActionFilterOptionsInterface } from '@/shared/model/contacts';
import { ActionFilterContactTypeEnums } from '@/shared/helper/enums/contacts';

import Input from '@/shared/components/common/Input';
import PopoverAction from '@/shared/components/common/Popover';
import Typography from '@/shared/components/common/Typography';
import ContactTable from '../../components/contact-table/ContactTable';
import ContactEmpty from '../../components/contact-empty/ContactEmpty';
import ContactAddFilter from '../../components/drawer-contact-add-filter/main/ContactAddFilter';
import ModalConfirmExportDatabase from '../../components/modal-confirm-export-database/ModalConfirmExportDatabase';

import * as S from './contacts.styles';

import icFilter from '@/assets/icons/contact/ic-filter.svg';
import icArrowDown from '@/assets/icons/contact/ic-arrow-down.svg';
import ModalImportContact from '../../components/modal-import-contact/main/ModalImportContact.';

function Contacts() {
  const { t } = useTranslation('contacts');

  const { visible: isModalFilter, toggle: handleTriggerModalFilter } =
    useModal();
  const { visible: isModalExport, toggle: handleExport } = useModal();
  const { visible: isModalImport, toggle: handleImport } = useModal();

  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading((prev) => !prev);
    }, 600);

    return () => clearTimeout(timer);
  }, []);

  const handleSearchContact = debounce(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      //TODO handle later
      e?.target?.value;
    },
    600,
  );

  function handleFilterContact() {}

  function handleActionFilterContact(actionType: ActionFilterContactTypeEnums) {
    switch (actionType) {
      case ActionFilterContactTypeEnums?.IMPORT:
        return handleImport();
        return;
      case ActionFilterContactTypeEnums?.EXPORT:
        return handleExport();
      case ActionFilterContactTypeEnums?.REMOVE:
        //TODO handle later
        return;
      default:
        break;
    }
  }

  const renderActionFilter = () => {
    return (
      <S.FilterActionWrap>
        {actionFilterOptions?.map((option: ActionFilterOptionsInterface) => (
          <S.FilterAction
            key={option?.key}
            $isRemove={
              option?.actionType === ActionFilterContactTypeEnums?.REMOVE
            }
            onClick={() => handleActionFilterContact(option?.actionType)}
          >
            <ReactSVG src={option?.icon} width={24} height={24} />
            <Typography>{t(`filter.${option?.label}`)}</Typography>
          </S.FilterAction>
        ))}
      </S.FilterActionWrap>
    );
  };

  return (
    <S.ContactsContainer>
      <S.FilterWrap>
        <S.InputSearch>
          <Input
            prefix
            placeholder={t('filter.search')}
            onChange={handleSearchContact}
          />
        </S.InputSearch>
        <S.FilterPopoverWrap>
          <S.ButtonFilter
            width="fit-content"
            onClick={handleTriggerModalFilter}
            iconPosition="left"
            icon={
              <Image src={icFilter} preview={false} width={15} height={18} />
            }
          >
            <Typography>{t('filter.filter')}</Typography>
          </S.ButtonFilter>
          <PopoverAction
            content={renderActionFilter()}
            placement="bottomRight"
            btnContent={
              <S.ButtonAction
                width="fit-content"
                onClick={handleFilterContact}
                iconPosition="left"
                icon={
                  <Image
                    src={icArrowDown}
                    preview={false}
                    width={20}
                    height={20}
                  />
                }
              >
                <Typography>{t('filter.action')}</Typography>
              </S.ButtonAction>
            }
          />
        </S.FilterPopoverWrap>
      </S.FilterWrap>
      {isLoading ? <ContactEmpty /> : <ContactTable />}
      {isModalFilter && (
        <ContactAddFilter
          open={isModalFilter}
          onClose={handleTriggerModalFilter}
        />
      )}
      {isModalExport && (
        <ModalConfirmExportDatabase
          open={isModalExport}
          onCancel={handleExport}
        />
      )}
      {isModalImport && (
        <ModalImportContact open={isModalImport} onCancel={handleImport} />
      )}
    </S.ContactsContainer>
  );
}

export default Contacts;
