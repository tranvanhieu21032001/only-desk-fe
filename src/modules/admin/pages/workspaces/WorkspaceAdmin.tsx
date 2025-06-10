import React from 'react';
import { Image } from 'antd';
import { useTranslation } from 'react-i18next';

import Typography from '@/shared/components/common/Typography';
import Input from '@/shared/components/common/Input';
import PopoverAction from '@/shared/components/common/Popover';

import icFilter from '@/assets/icons/contact/ic-filter.svg';
import icArrowDown from '@/assets/icons/contact/ic-arrow-down.svg';

import * as S from './WorkspaceAdmin.styles';
import WorkspaceTable from '../../components/workspaces/WorkspaceTable';

const WorkspaceAdmin = () => {
  const { t } = useTranslation('workspace');

  const dataSource = [
    {
      key: '1',
      websiteUrl: 'https://example.com',
      websiteID: 'WS123456',
      contactEmail: 'admin@example.com',
      owner: 'John Doe',
      status: 'Active',
      created: '2024-05-01',
    },
    {
      key: '2',
      websiteUrl: 'https://another.com',
      websiteID: 'WS654321',
      contactEmail: 'owner@another.com',
      owner: 'Jane Smith',
      status: 'Inactive',
      created: '2024-03-15',
    },
  ];

  const renderActionFilter = () => (
    <S.FilterActionWrap>
      <S.FilterAction onClick={() => console.log('Export')}>
        <Typography>Export</Typography>
      </S.FilterAction>
      <S.FilterAction $isRemove onClick={() => console.log('Remove')}>
        <Typography>Remove</Typography>
      </S.FilterAction>
    </S.FilterActionWrap>
  );

  return (
    <S.Container>
      <S.FilterWrap>
        <S.InputSearch>
          <Input prefix placeholder="Search..." onChange={() => {}} />
        </S.InputSearch>
        <S.FilterPopoverWrap>
          <S.ButtonFilter
            width="fit-content"
            onClick={() => console.log('Filter')}
            iconPosition="left"
            icon={<Image src={icFilter} preview={false} width={15} height={18} />}
          >
            <Typography>Filter</Typography>
          </S.ButtonFilter>
          <PopoverAction
            content={renderActionFilter()}
            placement="bottomRight"
            btnContent={
              <S.ButtonAction
                width="fit-content"
                onClick={() => {}}
                iconPosition="left"
                icon={<Image src={icArrowDown} preview={false} width={20} height={20} />}
              >
                <Typography>Action</Typography>
              </S.ButtonAction>
            }
          />
        </S.FilterPopoverWrap>
      </S.FilterWrap>

      <WorkspaceTable
        data={dataSource}
        onRowSelectionChange={(rows) => console.log('Selected:', rows)}
      />
    </S.Container>
  );
};

export default WorkspaceAdmin;
