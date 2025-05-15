import { Col, Row } from 'antd';

import ArticleMenus from '../../components/article/article-menus/ArticleMenus';
import ArticleContent from '../../components/article/article-content/main/ArticleContent';

import * as S from './Articles.styles';

function Articles() {
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
