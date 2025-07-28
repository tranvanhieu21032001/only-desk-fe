import { Col, Row } from 'antd'
import * as S from './KnowledgeBase.styles'
import KnowledgeBaseMenu from '../../components/knowledge-base/knowledge-base-menu/KnowledgeBaseMenu'
import KnowledgeBaseContent from '../../components/knowledge-base/knowledge-base-content/main/KnowledgeBaseContent'

const KnowledgeBase = () => {
  return (
     <S.KnowledgeBaseContainer>
            <Row gutter={[4, 4]}>
                <Col xs={24} xl={5}>
                    <KnowledgeBaseMenu />
                </Col>
                <Col xs={24} xl={19}>
                   <KnowledgeBaseContent/>
                </Col>
            </Row>
        </S.KnowledgeBaseContainer>
  )
}

export default KnowledgeBase