import React, { useEffect, useState, useCallback } from 'react';
import { Image } from 'antd';
import * as S from './UserAdmin.styles';
import Typography from '@/shared/components/common/Typography';
import Input from '@/shared/components/common/Input';
import PopoverAction from '@/shared/components/common/Popover';
import debounce from 'lodash/debounce';

import icFilter from '@/assets/icons/contact/ic-filter.svg';
import icArrowDown from '@/assets/icons/contact/ic-arrow-down.svg';
import UserTable from '../../components/users/UserTable';
import { getAdminUsers } from '../../api/admin';

const UserAdmin = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [searchText, setSearchText] = useState('');

  const fetchUsers = async (
    page: number,
    pageSize: number,
    keyword?: string,
  ) => {
    setLoading(true);
    try {
      const response = await getAdminUsers(page, pageSize, keyword);
      const formattedData = response.data.map((u: any, idx: number) => ({
        key: u._id,
        avatar: 'https://i.pravatar.cc/40?img=' + (idx + 1),
        name: `${u.firstName || ''} ${u.lastName || ''}`.trim() || 'Guest',
        email: u.email,
        role: u.role,
        status: u.status,
        created: new Date(u.createdAt).toLocaleDateString(),
      }));
      setUsers(formattedData);
      setPagination({
        current: page,
        pageSize,
        total: response.total || formattedData.length,
      });
    } catch (error) {
      console.error('Failed to fetch admin users:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers(pagination.current, pagination.pageSize, searchText);
  }, []);

  const handleTableChange = (newPagination: any) => {
    fetchUsers(newPagination.current, newPagination.pageSize, searchText);
  };

  const debouncedSearch = useCallback(
    debounce((value: string) => {
      fetchUsers(1, pagination.pageSize, value);
    }, 400),
    [pagination.pageSize],
  );

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchText(value);
    debouncedSearch(value);
  };

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
      />
    </S.UserAdminContainer>
  );
};

export default UserAdmin;
