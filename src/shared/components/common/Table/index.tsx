import { ReactElement, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Image } from 'antd';

import {
  KEY_PAGE,
  KEY_PAGE_SIZE,
  PAGE,
  PAGE_SIZE_OPTIONS,
} from '@/shared/constant/common';
import { useAppSelector } from '@/shared/hooks';
import { useRouter } from '@/shared/hooks/useRouter';
import { objectHistoryInterface } from '@/core/model/common';

import Typography from '../Typography';

import * as S from './table.styles';

import icNext from '@/assets/icons/common/ic-next.svg';
import icPrevious from '@/assets/icons/common/ic-prev.svg';
import icJumpNext from '@/assets/icons/common/ic-jump-next.svg';
import icJumpPrevious from '@/assets/icons/common/ic-jump-prev.svg';

interface TableProps {
  dataSource: any;
  columns: any;
  loading?: boolean;
  hasPagination?: boolean;
  totalDocs: number;
  summary?: (pageData: readonly any[]) => ReactElement;
  rowSelection?: {
    selectedRowKeys?: any[];
    onChange?: (selectedRowKeys: any[], selectedRows: any[]) => void;
    onSelectAll?: (
      selected: boolean,
      selectedRows: any[],
      changeRows: any[],
    ) => void;
    type?: 'checkbox' | 'radio';
  };
  rowKey?: string;
  onRow?: any;
}

function Table({
  dataSource,
  columns,
  loading = false,
  hasPagination = true,
  totalDocs = 0,
  summary,
  rowSelection,
  rowKey = 'id',
  onRow,
  ...props
}: TableProps) {
  const { replaceState } = useRouter();
  const [searchParams] = useSearchParams();
  const { currentObjHistory }: any = useAppSelector(
    (state) => state.historyRoute,
  );

  const metaData = useMemo(() => {
    return {
      page:
        currentObjHistory?.find(
          (item: objectHistoryInterface) => item?.key === KEY_PAGE,
        )?.value ||
        searchParams?.get(KEY_PAGE) ||
        PAGE,
      pageSize:
        currentObjHistory?.find(
          (item: objectHistoryInterface) => item?.key === KEY_PAGE_SIZE,
        )?.value ||
        searchParams?.get(KEY_PAGE_SIZE) ||
        PAGE_SIZE_OPTIONS?.[0]?.value,
    };
  }, [currentObjHistory, searchParams]);

  const initData = useMemo(() => {
    const columnsDataIndex = columns?.map((item: any) => item?.dataIndex) || [];
    const dataInit = Array(10)
      .fill('')
      .map((_, index) => {
        const obj: Record<string, string> = {};
        columnsDataIndex?.forEach((element: any) => {
          obj[element] = `${index} - init`;
        });
        return obj;
      });

    const columnInit = columns?.map((item: any) => ({
      ...item,
      render: () => {
        return (
          <S.SkeletonInput active={true} size="small" $width={item?.width} />
        );
      },
    }));

    return {
      data: dataInit,
      columns: columnInit,
    };
  }, [columns]);

  function handleChangePage(page: number) {
    replaceState({ [KEY_PAGE]: page });
  }

  return (
    <S.TableContainer>
      <S.TableWrap
        columns={loading ? initData?.columns : columns}
        dataSource={loading ? initData?.data : dataSource}
        bordered
        scroll={{
          x: '800px',
          y: `calc(100vh - ${hasPagination ? '270px' : '210px'})`,
        }}
        pagination={false}
        summary={summary}
        $isWidth={columns?.length}
        rowSelection={
          rowSelection && {
            ...rowSelection,
          }
        }
        onRow={onRow}
        rowKey={rowKey}
        {...props}
      />
      {hasPagination && (
        <S.PaginationWrap>
          <S.PagePercentPageSize>
            <Typography>
              Page {metaData?.page} of{' '}
              {Math.ceil(totalDocs / metaData?.pageSize)}
            </Typography>
          </S.PagePercentPageSize>
          <S.JumpToPageWrap>
            <S.JumpToPage
              disabled={Number(metaData?.page) === 1}
              onClick={() =>
                handleChangePage(
                  Math.min(
                    Math.ceil(totalDocs / metaData.pageSize),
                    Math.max(1, Number(metaData?.page) - 3),
                  ),
                )
              }
            >
              <Image
                preview={false}
                width={26}
                height={26}
                src={icJumpPrevious}
              />
            </S.JumpToPage>
            <S.JumpToPage
              onClick={() => handleChangePage(Number(metaData?.page) - 1)}
              disabled={Number(metaData?.page) === 1}
            >
              <Image preview={false} width={22} height={22} src={icPrevious} />
            </S.JumpToPage>
          </S.JumpToPageWrap>
          <S.PaginationContent
            total={totalDocs || 0}
            current={Number(metaData?.page)}
            pageSize={
              metaData?.pageSize
                ? Number(metaData.pageSize)
                : PAGE_SIZE_OPTIONS?.[0]?.value
            }
            showSizeChanger={false}
            showQuickJumper={false}
            onChange={handleChangePage}
          />
          <S.JumpToPageWrap>
            <S.JumpToPage
              onClick={() => handleChangePage(Number(metaData?.page) + 1)}
              disabled={
                Number(metaData?.page) ===
                Math.ceil(totalDocs / metaData?.pageSize)
              }
            >
              <Image preview={false} width={22} height={22} src={icNext} />
            </S.JumpToPage>
            <S.JumpToPage
              disabled={
                Number(metaData?.page) ===
                Math.ceil(totalDocs / metaData?.pageSize)
              }
              onClick={() =>
                handleChangePage(
                  Math.min(
                    Math.ceil(totalDocs / metaData.pageSize),
                    Math.max(1, Number(metaData?.page) + 3),
                  ),
                )
              }
            >
              <Image preview={false} width={26} height={26} src={icJumpNext} />
            </S.JumpToPage>
          </S.JumpToPageWrap>
        </S.PaginationWrap>
      )}
    </S.TableContainer>
  );
}

export default Table;
