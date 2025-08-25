import { useEffect, useState, useMemo } from 'react';
import { Image } from 'antd';
import { useSelector } from 'react-redux';
import debounce from 'lodash/debounce';

import Typography from '@/shared/components/common/Typography';
import Input from '@/shared/components/common/Input';
import PopoverAction from '@/shared/components/common/Popover';
import icFilter from '@/assets/icons/contact/ic-filter.svg';
import icArrowDown from '@/assets/icons/contact/ic-arrow-down.svg';
import * as S from './WorkspaceAdmin.styles';
import WorkspaceTable from '../../components/workspaces/WorkspaceTable';
import { RootState } from '@/core/store';
import { fetchWorkspaces } from '../../store/adminWorkspacesSlice';
import { useAppDispatch } from '@/shared/hooks';

const WorkspaceAdmin = () => {
  const dispatch = useAppDispatch();
  const { workspaces, loading } = useSelector(
    (state: RootState) => state.adminWorkspaces,
  );
  const [searchKeyword, setSearchKeyword] = useState('');
  const [currentPage, _setCurrentPage] = useState(1);
  const pageSize = 20;

  // Debounced fetch
  const debouncedFetch = useMemo(
    () =>
      debounce((keyword: string, page: number) => {
        dispatch(fetchWorkspaces({ keyword, page, limit: pageSize }));
      }, 500),
    [dispatch],
  );

  useEffect(() => {
    debouncedFetch(searchKeyword, currentPage);
  }, [searchKeyword, currentPage, debouncedFetch]);

  useEffect(() => {
    return () => {
      debouncedFetch.cancel();
    };
  }, [debouncedFetch]);

  // const handleTableChange = (pagination: any) => {
  //   setCurrentPage(pagination.current);
  // };

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
          <Input
            prefix
            placeholder="Search..."
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
          />
        </S.InputSearch>
        <S.FilterPopoverWrap>
          <S.ButtonFilter
            width="fit-content"
            onClick={() => console.log('Filter')}
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

      <WorkspaceTable
        data={workspaces}
        loading={loading}
        onRowSelectionChange={(rows) => console.log('Selected:', rows)}
      />
    </S.Container>
  );
};

export default WorkspaceAdmin;
