import { Image } from 'antd';
import * as S from './UserAdmin.styles';
import Typography from '@/shared/components/common/Typography';
import Input from '@/shared/components/common/Input';
import PopoverAction from '@/shared/components/common/Popover';

import icFilter from '@/assets/icons/contact/ic-filter.svg';
import icArrowDown from '@/assets/icons/contact/ic-arrow-down.svg';
import UserTable from '../../components/users/UserTable';

const UserAdmin = () => {
  const handleFilterUser = () => {
    // TODO: handle filter
  };

  const renderActionFilter = () => {
    return (
      <S.FilterActionWrap>
        <S.FilterAction>
          <Typography>Import</Typography>
        </S.FilterAction>
        <S.FilterAction>
          <Typography>Export</Typography>
        </S.FilterAction>
      </S.FilterActionWrap>
    );
  };

  return (
    <S.UserAdminContainer>
      <S.FilterWrap>
        <S.InputSearch>
          <Input placeholder="Search users..." />
        </S.InputSearch>
        <S.FilterPopoverWrap>
          <S.ButtonFilter
            width="fit-content"
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
                onClick={handleFilterUser}
                iconPosition="left"
                icon={<Image src={icArrowDown} preview={false} width={20} height={20} />}
              >
                <Typography>Action</Typography>
              </S.ButtonAction>
            }
          />
        </S.FilterPopoverWrap>
      </S.FilterWrap>
      <UserTable />
    </S.UserAdminContainer>
  );
};

export default UserAdmin;
