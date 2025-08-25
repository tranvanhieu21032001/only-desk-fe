import React, { useEffect, useCallback, useState } from 'react';
import { Image } from 'antd';
import * as S from './UserAdmin.styles';
import Typography from '@/shared/components/common/Typography';
import Input from '@/shared/components/common/Input';
import PopoverAction from '@/shared/components/common/Popover';
import debounce from 'lodash/debounce';

import icFilter from '@/assets/icons/contact/ic-filter.svg';
import icArrowDown from '@/assets/icons/contact/ic-arrow-down.svg';
import UserTable from '../../components/users/UserTable';
// import avatarDefault from '@/assets/images/avatar-default.png';

// Redux
import { useSelector } from 'react-redux';
import { fetchUsers } from '../../store/adminUsersSlice';
import { RootState } from '@/core/store';
import { useAppDispatch } from '@/shared/hooks';

import UserDrawer from '../../components/users/UserDrawer';

const UserAdmin = () => {
  const dispatch = useAppDispatch();
  const { users, loading, pagination } = useSelector(
    (state: RootState) => state.adminUser,
  );

  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [searchText, setSearchText] = useState('');
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);

  const loadUsers = useCallback(
    (page = 1, pageSize = 10, keyword?: string) => {
      dispatch(fetchUsers({ page, pageSize, keyword }));
    },
    [dispatch],
  );

  useEffect(() => {
    loadUsers(pagination.current, pagination.pageSize, searchText);
  }, []);

  const handleTableChange = (newPagination: {
    current: number;
    pageSize: number;
  }) => {
    loadUsers(newPagination.current, newPagination.pageSize, searchText);
  };

  const debouncedSearch = useCallback(
    debounce((value: string) => {
      loadUsers(1, pagination.pageSize, value);
    }, 400),
    [pagination.pageSize, loadUsers],
  );

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchText(value);
    debouncedSearch(value);
  };

  const handleFilterUser = () => {
    // TODO: handle filter
  };

  const handleOpenDrawer = (user: any) => {
    setSelectedUser(user);
    setDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setDrawerOpen(false);
  };

  const renderActionFilter = () => (
    <S.FilterActionWrap>
      <S.FilterAction>
        <Typography>Import</Typography>
      </S.FilterAction>
      <S.FilterAction>
        <Typography>Export</Typography>
      </S.FilterAction>
    </S.FilterActionWrap>
  );

  return (
    <S.UserAdminContainer>
      <S.FilterWrap>
        <S.InputSearch>
          <Input
            placeholder="Search users..."
            value={searchText}
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
            content={renderActionFilter()}
            placement="bottomRight"
            btnContent={
              <S.ButtonAction
                width="fit-content"
                onClick={handleFilterUser}
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
                <Typography>Action</Typography>
              </S.ButtonAction>
            }
          />
        </S.FilterPopoverWrap>
      </S.FilterWrap>

      <UserTable
        users={users}
        loading={loading}
        pagination={pagination}
        onChange={handleTableChange}
        selectedRowKeys={selectedRowKeys}
        onSelectChange={setSelectedRowKeys}
        onRowClick={handleOpenDrawer}
        onViewClick={handleOpenDrawer}
      />

      {selectedUser && (
        <UserDrawer
          open={drawerOpen}
          onClose={handleCloseDrawer}
          user={selectedUser}
        />
      )}
    </S.UserAdminContainer>
  );
};

export default UserAdmin;
