import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
// import { useTranslation } from 'react-i18next';

import Typography from '@/shared/components/common/Typography';
import * as S from './KnowledgeBaseMenu.styles';
import { KnowLedgeBaseEnums } from '@/modules/settings/helpers/enums/knowledge-base';

const KnowledgeBaseMenu: React.FC = () => {
  // const { t } = useTranslation('knowledgeBase');

  const knowledgeBaseMenus = [
    { key: KnowLedgeBaseEnums.SET_KNOWLEDGE_BASE, label: 'Setup Knowledge Base' },
    { key: KnowLedgeBaseEnums.CUSTOMIZE_KNOWLEDGE_BASE, label: 'Customize Knowledge Base' },
  ];

  const [searchParams, setSearchParams] = useSearchParams();
  const type = searchParams.get('type');

  const defaultType = knowledgeBaseMenus[0].key;
  useEffect(() => {
    if (!type) {
      setSearchParams({ type: defaultType }, { replace: true });
    }
  }, [type, setSearchParams, defaultType]);

  const handleMenuClick = (key: string) => {
    setSearchParams({ type: key });
  };

  return (
    <S.KnowledgeBaseMenuContainer>
      {knowledgeBaseMenus.map((item) => (
        <S.KnowledgeBaseItem
          key={item.key}
          $isActive={(type || defaultType) === item.key}
          onClick={() => handleMenuClick(item.key)}
        >
          <Typography>{item.label}</Typography>
        </S.KnowledgeBaseItem>
      ))}
    </S.KnowledgeBaseMenuContainer>
  );
};

export default KnowledgeBaseMenu;
