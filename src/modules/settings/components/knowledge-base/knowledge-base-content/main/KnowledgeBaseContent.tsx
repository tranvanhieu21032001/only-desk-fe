import { useEffect, useMemo } from 'react';
import { KnowLedgeBaseEnums } from '@/modules/settings/helpers/enums/knowledge-base';
import { useAppDispatch, useAppSelector } from '@/shared/hooks';
import { useSearchParams } from 'react-router-dom';
import SetupKnowledgeBase from '../setup-knowledgebase/SetupKnowledgeBase';
import CustomizeKnowledgeBase from '../customize-knowledbase/CustomizeKnowledgeBase';
import styled from 'styled-components';
import { fetchKnowledgeBaseSetting } from '@/modules/settings/store/features/knowledgebase';
import { useSelector } from 'react-redux';
import { RootState } from '@/core/store';

const KnowledgeBaseContainer = styled.section`
  height: 100%;
  border-radius: 0 8px 8px 0;
  overflow-y: scroll;
`;

const KnowledgeBaseContent = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchKnowledgeBaseSetting());
  }, [dispatch]);

   const { settings } = useSelector((state: RootState) => state.knowledgeBaseSettings);
console.log("settings", settings);


  const [search] = useSearchParams();
  const { currentObjHistory }: any = useAppSelector(
    (state) => state?.historyRoute,
  );
  const type =
    currentObjHistory?.find((item: any) => item?.key === 'type')?.value ||
    search?.get('type') ||
    KnowLedgeBaseEnums?.SET_KNOWLEDGE_BASE;

  const renderBillingContent = useMemo(() => {
    switch (type) {
      case KnowLedgeBaseEnums.SET_KNOWLEDGE_BASE:
        return <SetupKnowledgeBase />;
      case KnowLedgeBaseEnums.CUSTOMIZE_KNOWLEDGE_BASE:
        return <CustomizeKnowledgeBase />;
      default:
        return <SetupKnowledgeBase />;
    }
  }, [type]);
  return (
    <KnowledgeBaseContainer>{renderBillingContent}</KnowledgeBaseContainer>
  );
};

export default KnowledgeBaseContent;
