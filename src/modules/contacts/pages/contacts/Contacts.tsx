import { Image, Skeleton } from 'antd';
import { ReactSVG } from 'react-svg';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { debounce, isEmpty } from 'lodash';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';

import { RootState } from '@/core/store';
import { KEY_PAGE, PAGE, PAGE_SIZE } from '@/shared/constant/common';
import { objectHistoryInterface } from '@/core/model/common';
import { fetchContacts } from '../../store/features/contacts';
import { actionFilterOptions } from '@/shared/helper/data/contacts';
import { ActionFilterOptionsInterface } from '@/shared/model/contacts';
import { useAppDispatch, useAppSelector, useModal } from '@/shared/hooks';
import { ActionFilterContactTypeEnums } from '@/shared/helper/enums/contacts';

import Input from '@/shared/components/common/Input';
import PopoverAction from '@/shared/components/common/Popover';
import Typography from '@/shared/components/common/Typography';
import ContactTable from '../../components/contact-table/ContactTable';
import ContactEmpty from '../../components/contact-empty/ContactEmpty';
import ModalImportContact from '../../components/modal-import-contact/main/ModalImportContact';
import ContactAddFilter from '../../components/drawer-contact-add-filter/main/ContactAddFilter';
import ModalConfirmExportDatabase from '../../components/modal-confirm-export-database/ModalConfirmExportDatabase';

import * as S from './contacts.styles';

import icFilter from '@/assets/icons/contact/ic-filter.svg';
import icArrowDown from '@/assets/icons/contact/ic-arrow-down.svg';
import { useRouter } from '@/shared/hooks/useRouter';

function Contacts() {
  const { t } = useTranslation('contacts');
  const dispatch = useAppDispatch();
  const [search] = useSearchParams();
  const { replaceState } = useRouter();

  const { currentObjHistory } = useAppSelector((state) => state.historyRoute);
  const page =
    (currentObjHistory || [])?.find(
      (item: objectHistoryInterface) => item.key === KEY_PAGE,
    )?.value ||
    search.get(KEY_PAGE) ||
    PAGE;

  const { contacts, isLoading } = useAppSelector(
    (state: RootState) => state.contacts,
  );
  const { currentWorkspace } = useAppSelector((state: RootState) => state.auth);

  const [keyword, setKeyword] = useState<string | null>(null);
  const [initialLoading, setInitialLoading] = useState(true);

  const { visible: isModalFilter, toggle: handleTriggerModalFilter } =
    useModal();
  const { visible: isModalExport, toggle: handleExport } = useModal();
  const { visible: isModalImport, toggle: handleImport } = useModal();

  const triggerSearch = useCallback(
    debounce((kw: string | null, pageNumber: number) => {
      if (!currentWorkspace) return;
      const offset = (pageNumber - 1) * PAGE_SIZE;
      dispatch(fetchContacts({ keyword: kw, offset })).finally(() => {
        setInitialLoading(false);
      });
    }, 600),
    [dispatch, currentWorkspace],
  );

  useEffect(() => () => triggerSearch.cancel(), [triggerSearch]);

  useEffect(() => {
    if (!currentWorkspace) return;
    setInitialLoading(true);
    triggerSearch(keyword, Number(page) || PAGE);
  }, [currentWorkspace, page, keyword, triggerSearch]);

  const renderContactContent = useMemo(() => {
    if (initialLoading || isLoading) {
      return <Skeleton active paragraph={{ rows: 8 }} />;
    }
    if (isEmpty(contacts)) return <ContactEmpty />;
    return <ContactTable />;
  }, [contacts, isLoading, initialLoading]);

  const handleSearchContact = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();
    const kw = value.length ? value : null;
    setKeyword(kw);

    setTimeout(() => replaceState({ [KEY_PAGE]: 1 }), 500);
  };
  function handleActionFilterContact(actionType: ActionFilterContactTypeEnums) {
    switch (actionType) {
      case ActionFilterContactTypeEnums.IMPORT:
        return handleImport();
      case ActionFilterContactTypeEnums.EXPORT:
        return handleExport();
      case ActionFilterContactTypeEnums.REMOVE:
        return;
      default:
        break;
    }
  }

  const renderActionFilter = () => (
    <S.FilterActionWrap>
      {actionFilterOptions.map((option: ActionFilterOptionsInterface) => (
        <S.FilterAction
          key={option.key}
          $isRemove={option.actionType === ActionFilterContactTypeEnums.REMOVE}
          onClick={() => handleActionFilterContact(option.actionType)}
        >
          <ReactSVG src={option.icon} width={24} height={24} />
          <Typography>{t(`filter.${option.label}`)}</Typography>
        </S.FilterAction>
      ))}
    </S.FilterActionWrap>
  );

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
                onClick={() => {}}
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

      {renderContactContent}

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
