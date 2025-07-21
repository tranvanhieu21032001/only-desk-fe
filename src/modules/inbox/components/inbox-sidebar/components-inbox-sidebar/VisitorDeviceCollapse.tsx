import React from 'react';
import { Image } from 'antd';
import { useTranslation } from 'react-i18next';

import Collapse from '@/shared/components/common/Collapse';

import chorme from '@/assets/icons/common/ic-chorme.svg';
import cloud from '@/assets/icons/common/ic-cloud.svg';

import * as S from '../InboxSidebar.styles';

interface VisitorDeviceCollapseProps {
  openCollapse: boolean;
}

const VisitorDeviceCollapse: React.FC<VisitorDeviceCollapseProps> = ({ openCollapse }) => {
  const { t } = useTranslation('inbox');

  return (
    <Collapse title={t('inboxSidebar.visitorsDevices')}>
      {openCollapse && (
        <S.SectionContent>
          <S.Field>
            <Image src={chorme} preview={false} /> Chrome on Win10
          </S.Field>
          <S.Field>
            <Image src={cloud} preview={false} /> 190:029:29:918:0ee Da Nang Viet...
          </S.Field>
        </S.SectionContent>
      )}
    </Collapse>
  );
};

export default VisitorDeviceCollapse;
