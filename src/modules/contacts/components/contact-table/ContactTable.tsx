import { ReactSVG } from 'react-svg';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ConfigProvider, Image, Rate } from 'antd';

import { MAIN_ROUTES } from '@/core/routes/constants';
import { contactsMockup } from '@/shared/helper/data/contacts';
import themeColors from '@/shared/styles/themes/default/colors';

import Table from '@/shared/components/common/Table';
import PopoverAction from '@/shared/components/common/Popover';
import Typography from '@/shared/components/common/Typography';

import * as S from './ContactTable.styles';

import icRemove from '@/assets/icons/contact/ic-remove.svg';
import icActionRemove from '@/assets/icons/contact/ic-action-remove.svg';

function ContactTable() {
  const { t } = useTranslation('contacts');
  const navigate = useNavigate();

  const [params, setParams] = useState<{
    search: string;
    isLoading: boolean;
  }>({
    search: '',
    isLoading: true,
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setParams((prev) => ({
        ...prev,
        isLoading: false,
      }));
    }, 600);

    return () => clearTimeout(timer);
  }, []);

  function handleRemoveContact() {
    //TODO handle later
  }

  const columnsContactTable = [
    {
      title: t('table.fullName'),
      key: 'fullName',
      minWidth: 200,
      width: 200,
      fixed: 'left',
      render: (record: any) => (
        <S.FullNameColumn>
          <Image preview={false} width={40} height={40} src={record.avatar} />
          {record.fullName}
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
      dataIndex: 'location',
      key: 'location',
      minWidth: 210,
      width: 210,
      render: (text: string) => (
        <S.TooltipColumn title={text}>{text}</S.TooltipColumn>
      ),
    },
    {
      title: t('table.company'),
      dataIndex: 'company',
      key: 'company',
      minWidth: 280,
      width: 280,
      render: (text: string) => (
        <S.TooltipColumn title={text}>{text}</S.TooltipColumn>
      ),
    },
    {
      title: t('table.segments'),
      dataIndex: 'segments',
      key: 'segments',
      minWidth: 130,
      width: 130,
      render: (segments: any) => (
        <S.SegmentColumn>
          {segments?.map((segment: string, index: number) => (
            <S.Segment key={index}>
              <Typography>{segment}</Typography>
            </S.Segment>
          ))}
        </S.SegmentColumn>
      ),
    },
    {
      title: t('table.lastActivity'),
      dataIndex: 'lastActive',
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
      dataIndex: 'action',
      minWidth: 50,
      width: 50,
      render: () => (
        <PopoverAction
          btnContent={
            <S.TooltipColumn title={t('table.remove')}>
              <ReactSVG width={24} height={24} src={icActionRemove} />
            </S.TooltipColumn>
          }
          content={
            <S.FilterActionWrap>
              <S.FilterAction onClick={handleRemoveContact} $isRemove={true}>
                <ReactSVG src={icRemove} width={24} height={24} />
                <Typography color={themeColors?.errorDark}>
                  {t('table.remove-profile')}
                </Typography>
              </S.FilterAction>
            </S.FilterActionWrap>
          }
          placement="bottomRight"
        />
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
        dataSource={contactsMockup}
        columns={columnsContactTable}
        totalDocs={10}
        rowSelection={rowSelection}
        loading={params?.isLoading}
        onRow={(record: any) => ({
          onClick: () => handleViewContactProfile(record),
          style: { cursor: 'pointer' },
        })}
      />
    </S.ContactTableContainer>
  );
}

export default ContactTable;
