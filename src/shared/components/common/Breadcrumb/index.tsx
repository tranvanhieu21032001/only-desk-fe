import React from 'react';
import { Breadcrumb } from 'antd';

import * as S from './breadcrumb.styles';

interface BreadcrumbProps {
  items: { title: React.ReactNode }[];
}

function BreadcrumbCommon({ items }: BreadcrumbProps) {
  return (
    <S.BreadcrumbContainer>
      <Breadcrumb items={items || []} />
    </S.BreadcrumbContainer>
  );
}

export default BreadcrumbCommon;
