import { useTranslation } from 'react-i18next';
import { debounce } from 'lodash';
import { Image } from 'antd';
import { useEffect, useState } from 'react';

import { actionFilterOptions } from '@/shared/helper/data/contacts';
import { ActionFilterOptionsInterface } from '@/shared/model/contacts';
import { ActionFilterContactTypeEnums } from '@/shared/helper/enums/contacts';

import Input from '@/shared/components/common/Input';
import PopoverAction from '@/shared/components/common/Popover';
import Typography from '@/shared/components/common/Typography';
import ContactTable from '../../components/contact-table/ContactTable';
import ContactEmpty from '../../components/contact-empty/ContactEmpty';

import * as S from './contacts.styles';

import icFilter from '@/assets/icons/contacts/ic-filter.svg';
import icArrowDown from '@/assets/icons/contacts/ic-arrow-down.svg';

function Contacts() {
  const { t } = useTranslation('contacts');

  const [isLoading, setIsLoading] = useState<boolean>(true);

  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     setIsLoading((prev) => !prev);
  //   }, 600);

  //   return () => clearTimeout(timer);
  // }, []);

  const handleSearchContact = debounce(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      //TODO handle later
      e?.target?.value;
    },
    600,
  );

  function handleFilterContact() {
    //TODO handle later
  }

  function handleActionFilterContact(actionType: ActionFilterContactTypeEnums) {
    switch (actionType) {
      case ActionFilterContactTypeEnums?.IMPORT:
        //TODO handle later
        return;
      case ActionFilterContactTypeEnums?.EXPORT:
        //TODO handle later
        return;
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
            <Image src={option?.icon} preview={false} width={24} height={24} />
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
            onClick={handleFilterContact}
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
    </S.ContactsContainer>
  );
}

export default Contacts;
