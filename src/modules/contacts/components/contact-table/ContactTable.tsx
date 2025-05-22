import { ReactSVG } from 'react-svg';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ConfigProvider, Image, Rate } from 'antd';

import { RootState } from '@/core/store';
import { MAIN_ROUTES } from '@/core/routes/constants';
import {
  fetchContacts,
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
import imgDefault from '@/assets/images/common/img-default.jpeg';
import icActionRemove from '@/assets/icons/contact/ic-action-remove.svg';
import imgAvatarDefault from '@/assets/images/settings/ic-avatar-default.png';

function ContactTable() {
  const { t } = useTranslation('contacts');
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  //TODO
  // const { currentObjHistory }: any = useAppSelector(
  //   (state) => state.historyRoute,
  // );
  const { currentWorkspace } = useAppSelector(
    (state: RootState) => state?.auth,
  );
  const { isLoading, contacts, totalDocs, pageInfo } = useAppSelector(
    (state: RootState) => state.contacts,
  );

  useEffect(() => {
    if (currentWorkspace) {
      dispatch(
        fetchContacts({
          workspaceId: currentWorkspace?.id,
        }),
      );
    }
  }, [pageInfo?.hasNextPage, currentWorkspace]);

  function handleRemoveContact(idContact: string) {
    dispatch(
      handleRemoveContactAction({
        workspaceId: currentWorkspace?.id as string,
        id: idContact,
        t: t,
      }),
    );
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
            src={record?.avatar || imgAvatarDefault}
            onError={(e) => (e.currentTarget.src = imgAvatarDefault)}
          />
          <Typography>{record?.name || '--/--'}</Typography>
        </S.FullNameColumn>
      ),
    },
    {
      title: t('table.email'),
      dataIndex: 'email',
      key: 'email',
      minWidth: 150,
      width: 150,
      render: (text: string) => (
        <S.TooltipColumn title={text}>{text}</S.TooltipColumn>
      ),
    },
    {
      title: t('table.location'),
      key: 'location',
      minWidth: 210,
      width: 210,
      render: (record: ContactInterface) => (
        <S.LocationColumn>
          <Image
            preview={false}
            width={36}
            height={23}
            src={imgDefault}
            onError={(e) => (e.currentTarget.src = imgDefault)}
          />
          <S.TooltipColumn title={record?.address}>
            {record?.address}
          </S.TooltipColumn>
        </S.LocationColumn>
      ),
    },
    {
      title: t('table.company'),
      key: 'company',
      minWidth: 280,
      width: 280,
      render: (record: ContactInterface) => (
        <S.TooltipColumn title={record?.companyInfo?.name}>
          {record?.companyInfo?.name}
        </S.TooltipColumn>
      ),
    },
    {
      title: t('table.segments'),
      key: 'segments',
      minWidth: 130,
      width: 130,
      render: (record: ContactInterface) => (
        <S.SegmentColumn>
          {record?.segments?.map((segment: string, index: number) => (
            <S.Segment key={index}>
              <Typography>{segment}</Typography>
            </S.Segment>
          ))}
        </S.SegmentColumn>
      ),
    },
    {
      title: t('table.lastActivity'),
      dataIndex: 'lastActivityAt',
      key: 'lastActive',
      minWidth: 150,
      width: 150,
    },
    {
      title: t('table.score'),
      dataIndex: 'score',
      key: 'score',
      minWidth: 130,
      width: 130,
      render: (text: number) => (
        <S.ScoreColumn>
          <ConfigProvider
            theme={{
              components: {
                Rate: {
                  starColor: themeColors?.warningDarkest,
                },
              },
            }}
          >
            <Rate allowHalf defaultValue={text} disabled={true} />
          </ConfigProvider>
        </S.ScoreColumn>
      ),
    },
    {
      minWidth: 50,
      width: 50,
      render: (record: ContactInterface) => (
        <S.LocationColumn
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <PopoverAction
            placement="bottomRight"
            trigger="click"
            btnContent={
              <S.RemoveActionColumn>
                <ReactSVG width={24} height={24} src={icActionRemove} />
              </S.RemoveActionColumn>
            }
            content={
              <S.FilterActionWrap>
                <S.FilterAction
                  onClick={() => {
                    handleRemoveContact(record?.id);
                  }}
                  $isRemove={true}
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
    onChange: (selectedRowKeys: React.Key[], selectedRows: any[]) => {
      console.log('selectedRowKeys changed: ', selectedRowKeys);
      console.log('selectedRows changed: ', selectedRows);
    },
  };

  function handleViewContactProfile(record: any) {
    navigate(MAIN_ROUTES?.CONTACT_DETAILS?.replace(':id', record?.id));
  }

  return (
    <S.ContactTableContainer>
      <Table
        dataSource={contacts}
        columns={columnsContactTable}
        totalDocs={totalDocs || 0}
        rowSelection={rowSelection}
        loading={isLoading}
        onRow={(record: any) => ({
          onClick: () => handleViewContactProfile(record),
          style: { cursor: 'pointer' },
        })}
      />
    </S.ContactTableContainer>
  );
}

export default ContactTable;
