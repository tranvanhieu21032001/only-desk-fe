import { Image } from 'antd';
import { ReactSVG } from 'react-svg';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import dayjs from 'dayjs';

import { RootState } from '@/core/store';
import { MAIN_ROUTES } from '@/core/routes/constants';
import {
  actionUpdateContactDetails,
  handleRemoveContactAction,
} from '../../store/features/contacts';
import { ContactInterface } from '../../models/contacts.model';
import { useAppDispatch, useAppSelector } from '@/shared/hooks';
import themeColors from '@/shared/styles/themes/default/colors';

import Table from '@/shared/components/common/Table';
import PopoverAction from '@/shared/components/common/Popover';
import Typography from '@/shared/components/common/Typography';

import * as S from './ContactTable.styles';

import icRemove from '@/assets/icons/contact/ic-remove.svg';
import icAvatarDefault from '@/assets/images/avatar-default.png';
import icActionRemove from '@/assets/icons/contact/ic-action-remove.svg';
import icNoitify from '@/assets/icons/contact/ic-notify-contact.svg';

import flagList from '@/shared/helper/data/flagIcon';
import Modal from '@/shared/components/common/Modal';
import fontWeight from '@/shared/styles/themes/default/fontWeight';
import Button from '@/shared/components/common/Button';

interface ContactTableProps {
  onSelectedChange?: (ids: string[]) => void;
}

function ContactTable({ onSelectedChange }: ContactTableProps) {
  const { t } = useTranslation('contacts');
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { contacts, totalDocs, isLoading, contactDetails } = useAppSelector(
    (state: RootState) => state.contacts,
  );

  const [isRemoveModalOpen, setIsRemoveModalOpen] = useState(false);

  /** Handlers */
  function handleRemoveContact() {
    setIsRemoveModalOpen(true);
  }

  function handleConfirmRemove(idContact?: string) {
    if (!idContact) return;

    dispatch(
      handleRemoveContactAction({
        ids: [idContact],
        t,
      }),
    );

    setIsRemoveModalOpen(false);
  }

  function handleViewContactProfile(record: ContactInterface) {
    dispatch(actionUpdateContactDetails(record));
    navigate(MAIN_ROUTES.CONTACT_DETAILS.replace(':id', record.id));
  }

  const columnsContactTable = [
    {
      title: t('table.fullName'),
      key: 'fullName',
      minWidth: 200,
      width: 200,
      fixed: 'left',
      render: (record: ContactInterface) => (
        <S.FullNameColumn>
          <Image
            preview={false}
            width={40}
            height={40}
            src={record?.avatar || icAvatarDefault}
            onError={(e) => (e.currentTarget.src = icAvatarDefault)}
          />
          <Typography>{record?.name || '-'}</Typography>
        </S.FullNameColumn>
      ),
    },
    {
      title: t('table.email'),
      dataIndex: 'email',
      key: 'email',
      minWidth: 250,
      width: 250,
      render: (text: string) => (
        <S.TooltipColumn title={text}>{text || '-'}</S.TooltipColumn>
      ),
    },
    {
      title: t('table.location'),
      key: 'location',
      minWidth: 200,
      width: 200,
      render: (record: ContactInterface) => {
        const flagIcon = flagList.find(
          (item) => item.code === record?.context?.countryCode,
        )?.image;

        const city = record?.context?.city;
        const country = record?.context?.countryName;
        const location = [city, country].filter(Boolean).join(', ') || '-';

        return (
          <S.LocationColumn>
            {flagIcon && (
              <Image preview={false} width={36} height={23} src={flagIcon} />
            )}
            <S.TooltipColumn title={location}>{location}</S.TooltipColumn>
          </S.LocationColumn>
        );
      },
    },
    {
      title: t('table.company'),
      key: 'company',
      minWidth: 200,
      width: 200,
      render: (record: ContactInterface) => (
        <S.TooltipColumn title={record?.companyInfo?.company}>
          {record?.companyInfo?.company || (
            <Typography color={themeColors?.newtralDark}>Unknown</Typography>
          )}
        </S.TooltipColumn>
      ),
    },
    {
      title: t('table.segments'),
      key: 'segments',
      minWidth: 230,
      width: 230,
      render: (record: ContactInterface) => (
        <S.SegmentColumn>
          {record?.segments?.length ? (
            record.segments.map((segment: string, idx: number) => (
              <S.Segment key={idx}>
                <Typography>{segment}</Typography>
              </S.Segment>
            ))
          ) : (
            <Typography>-</Typography>
          )}
        </S.SegmentColumn>
      ),
    },

    {
      title: t('table.lastActivity'),
      dataIndex: 'lastActivityAt',
      key: 'lastActive',
      minWidth: 120,
      width: 120,
      render: (record: ContactInterface) => (
        <S.TooltipColumn title={record?.lastActivityAt}>
          {record?.lastActivityAt
            ? dayjs(record.lastActivityAt).format('DD/MM/YYYY HH:mm')
            : '-'}
        </S.TooltipColumn>
      ),
    },
    {
      minWidth: 50,
      width: 50,
      render: (record: ContactInterface) => (
        <S.LocationColumn onClick={(e) => e.stopPropagation()}>
          <PopoverAction
            placement="bottomRight"
            trigger="hover"
            btnContent={
              <S.RemoveActionColumn>
                <ReactSVG width={24} height={24} src={icActionRemove} />
              </S.RemoveActionColumn>
            }
            content={
              <S.FilterActionWrap>
                <S.FilterAction
                  onClick={() => handleRemoveContact(record)}
                  $isRemove
                >
                  <ReactSVG src={icRemove} width={24} height={24} />
                  <Typography color={themeColors?.errorDark}>
                    {t('table.remove-profile')}
                  </Typography>
                </S.FilterAction>
              </S.FilterActionWrap>
            }
          />
        </S.LocationColumn>
      ),
    },
  ];

  const rowSelection = {
    onChange: (_keys: React.Key[], selectedRows: ContactInterface[]) => {
      const rawIds = selectedRows.map((row) => row.rawId);
      onSelectedChange?.(rawIds);
    },
  };

  return (
    <S.ContactTableContainer>
      <Table
        dataSource={contacts}
        columns={columnsContactTable}
        totalDocs={totalDocs || 0}
        rowSelection={rowSelection}
        loading={isLoading}
        onRow={(record: ContactInterface) => ({
          onClick: () => handleViewContactProfile(record),
          style: { cursor: 'pointer' },
        })}
      />

      <Modal
        isOpen={isRemoveModalOpen}
        onClose={() => setIsRemoveModalOpen(false)}
        hideHeader
        width={440}
        children={
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
            <ReactSVG src={icNoitify} />
            <div>
              <Typography fontWeight={fontWeight?.semiBold} margin="0 0 12px 0">
                {t('contact-profile.confirm-delete-title')}
              </Typography>
              <Typography color="#5B5B5B">
                {t('contact-profile.confirm-delete-desc')}
              </Typography>
            </div>
          </div>
        }
        footer={
          <S.WrappButton>
            <Button onClick={() => setIsRemoveModalOpen(false)}>
              {t('contact-profile.cancel')}
            </Button>
            <Button
              type="danger"
              onClick={() => handleConfirmRemove(contactDetails?.rawId)}
            >
              {t('contact-profile.remove')}
            </Button>
          </S.WrappButton>
        }
      />
    </S.ContactTableContainer>
  );
}

export default ContactTable;
