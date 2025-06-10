import React from 'react';
import * as S from './plugins-admin.styles';
import Input from '@/shared/components/common/Input';
import Typography from '@/shared/components/common/Typography';
import { Image } from 'antd';
import icFilter from '@/assets/icons/contact/ic-filter.svg';
import icArrowDown from '@/assets/icons/contact/ic-arrow-down.svg';
import PopoverAction from '@/shared/components/common/Popover';
import PluginsTable from '../../components/plugins/PluginsTable';

const PluginsAdmin = () => {
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log('Search:', e.target.value);
  };

  const renderActionPopover = () => (
    <S.ActionGroup>
      <S.ActionItem>Install Plugin</S.ActionItem>
      <S.ActionItem>Remove Plugin</S.ActionItem>
    </S.ActionGroup>
  );

  return (
    <S.Container>
      <S.FilterWrap>
        <S.InputSearch>
          <Input
            prefix
            placeholder="Search plugins..."
            onChange={handleSearch}
          />
        </S.InputSearch>
        <S.FilterPopoverWrap>
          <S.ButtonFilter
            width="fit-content"
            iconPosition="left"
            icon={
              <Image src={icFilter} preview={false} width={15} height={18} />
            }
          >
            <Typography>Filter</Typography>
          </S.ButtonFilter>

          <PopoverAction
            placement="bottomRight"
            content={renderActionPopover()}
            btnContent={
              <S.ButtonAction
                width="fit-content"
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
                <Typography>Actions</Typography>
              </S.ButtonAction>
            }
          />
        </S.FilterPopoverWrap>
      </S.FilterWrap>

      <PluginsTable />
    </S.Container>
  );
};

export default PluginsAdmin;
