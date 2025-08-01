import { useEffect } from 'react';
import { Col, Row } from 'antd';
import { useDispatch, useSelector } from 'react-redux';

import ArticleMenus from '../../components/article/article-menus/ArticleMenus';
import ArticleContent from '../../components/article/article-content/main/ArticleContent';

import * as S from './Articles.styles';
import { getHelpdeskSettings } from '@/modules/knowledge-base/store/helpdeskSettingsSlice';
import { AppDispatch, RootState } from '@/core/store';

function Articles() {
  const dispatch = useDispatch<AppDispatch>();
  const settings = useSelector((state: RootState) => state.helpdeskSetting.data);

  useEffect(() => {
    if (!settings) {
      dispatch(getHelpdeskSettings());
    }
  }, [dispatch, settings]);
  

  return (
    <S.AccountContainer>
      <Row gutter={[4, 4]}>
        <Col xs={24} xl={4}>
          <ArticleMenus />
        </Col>
        <Col xs={24} xl={20}>
          <ArticleContent />
        </Col>
      </Row>
    </S.AccountContainer>
  );
}

export default Articles;
